import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { build } from "esbuild";
const bundled = await build({
  entryPoints: ["cloudflare/reviews/worker.mjs"],
  bundle: true,
  write: false,
  format: "esm",
  loader: { ".html": "text", ".txt": "text" },
});
const {
  default: worker,
  verifyTurnstile,
  cleanup,
} = await import(
  "data:text/javascript;base64," +
    Buffer.from(bundled.outputFiles[0].text).toString("base64")
);
const adminToken = "a".repeat(64),
  site = "http://127.0.0.1:8077";
function setup() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(
    "PRAGMA foreign_keys=ON;" +
      fs.readFileSync("cloudflare/reviews/migrations/0001_reviews.sql", "utf8"),
  );
  const statement = (sql, params = []) => ({
    bind(...args) {
      return statement(sql, args);
    },
    async first() {
      return sqlite.prepare(sql).get(...params) || null;
    },
    async all() {
      return { results: sqlite.prepare(sql).all(...params) };
    },
    async run() {
      const r = sqlite.prepare(sql).run(...params);
      return { meta: { changes: Number(r.changes) } };
    },
  });
  const env = {
    DB: {
      prepare: (sql) => statement(sql),
      async batch(statements) {
        sqlite.exec("BEGIN");
        try {
          const results = [];
          for (const s of statements) results.push(await s.run());
          sqlite.exec("COMMIT");
          return results;
        } catch (e) {
          sqlite.exec("ROLLBACK");
          throw e;
        }
      },
    },
    ENVIRONMENT: "local",
    ALLOWED_ORIGINS: site,
    RATE_SECRET: "r".repeat(64),
    ADMIN_TOKEN: adminToken,
  };
  const call = async (
    path,
    { data, auth, origin = site, method, ...headers } = {},
  ) =>
    worker.fetch(
      new Request("http://127.0.0.1:8787" + path, {
        method: method || (data ? "POST" : "GET"),
        headers: {
          Origin: origin,
          ...(data ? { "Content-Type": "application/json" } : {}),
          ...(auth ? { Authorization: "Bearer " + auth } : {}),
          ...headers,
        },
        ...(data ? { body: JSON.stringify(data) } : {}),
      }),
      env,
    );
  const submit = (patch = {}) =>
    call("/v1/reviews", {
      data: {
        experience: "oje",
        publicName: "Prueba técnica",
        language: "es",
        rating: 1,
        comment: "Comentario de prueba técnica, no es una experiencia real.",
        consent: true,
        consentVersion: "2026-11-17-v1",
        turnstileToken: "local-preview-only",
        ...patch,
      },
    });
  const moderate = async (id, status = "approved") => {
    const row = sqlite
      .prepare("SELECT updated_at FROM reviews WHERE id=?")
      .get(id);
    return call("/v1/admin/moderate", {
      auth: adminToken,
      origin: "http://127.0.0.1:8787",
      data: {
        id,
        status,
        reason: "Revisión de prueba",
        updatedAt: row.updated_at,
      },
    });
  };
  return { sqlite, env, call, submit, moderate };
}
test("pending first, explicit approval preserves negative rating and exact original text; public allowlist", async () => {
  const { submit, call, moderate, sqlite } = setup();
  const comment =
    "  Crítica técnica de prueba: <script>alert(1)</script> https://example.org  ";
  const response = await submit({ comment });
  assert.equal(response.status, 201);
  const receipt = await response.json();
  assert.equal(receipt.status, "pending");
  assert.equal(receipt.deletionToken.length, 72);
  assert.equal((await (await call("/v1/reviews")).json()).reviews.length, 0);
  assert.equal((await moderate(receipt.id)).status, 200);
  const published = (await (await call("/v1/reviews")).json()).reviews[0];
  assert.equal(published.comment, comment);
  assert.equal(published.rating, 1);
  assert.deepEqual(
    Object.keys(published).sort(),
    [
      "id",
      "experience",
      "language",
      "public_name",
      "rating",
      "comment",
      "created_at",
    ].sort(),
  );
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS n FROM moderation_log").get().n,
    1,
  );
  assert.equal((await moderate(receipt.id, "hidden")).status, 200);
  assert.equal((await (await call("/v1/reviews")).json()).reviews.length, 0);
  assert.equal((await moderate(receipt.id, "rejected")).status, 200);
});
test("consent, catalogue, language, stars, bounds and JSON validation fail closed", async () => {
  for (const patch of [
    { consent: false },
    { consent: "true" },
    { consentVersion: "old" },
    { experience: "../sql" },
    { language: "de" },
    { rating: 0 },
    { rating: 6 },
    { rating: 2.5 },
    { comment: "short" },
    { comment: "x".repeat(2001) },
    { publicName: "x" },
    { publicName: "x".repeat(81) },
    { website: "bot" },
    { comment: "test\u0000 untrusted character invalid" },
  ]) {
    const { submit, sqlite } = setup();
    assert.equal((await submit(patch)).status, 400, JSON.stringify(patch));
    assert.equal(
      sqlite.prepare("SELECT count(*) AS n FROM reviews").get().n,
      0,
    );
  }
  const { env } = setup();
  const invalid = await worker.fetch(
    new Request("http://127.0.0.1:8787/v1/reviews", {
      method: "POST",
      headers: { Origin: site, "Content-Type": "application/json" },
      body: "{",
    }),
    env,
  );
  assert.equal(invalid.status, 400);
  const oversized = await worker.fetch(
    new Request("http://127.0.0.1:8787/v1/reviews", {
      method: "POST",
      headers: { Origin: site, "Content-Type": "application/json" },
      body: "x".repeat(12001),
    }),
    env,
  );
  assert.equal(oversized.status, 413);
});
test("origin, auth, CSRF, no production preview bypass and no credential disclosure", async () => {
  const { call, env, submit } = setup();
  assert.equal(
    (await call("/v1/reviews", { origin: "https://evil.example" })).status,
    403,
  );
  assert.equal(
    (await call("/v1/admin/reviews", { origin: "http://127.0.0.1:8787" }))
      .status,
    401,
  );
  assert.equal(
    (
      await call("/v1/admin/reviews", {
        auth: "wrong",
        origin: "http://127.0.0.1:8787",
      })
    ).status,
    401,
  );
  assert.equal(
    (await call("/v1/admin/reviews", { auth: adminToken })).status,
    403,
  );
  const admin = await call("/admin");
  assert.equal(admin.headers.get("x-robots-tag"), "noindex, nofollow");
  assert.ok(
    admin.headers
      .get("content-security-policy")
      .includes("frame-ancestors 'none'"),
  );
  assert.ok(!(await admin.text()).includes(adminToken));
  const preflight = await call("/v1/reviews", { method: "OPTIONS" });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("Access-Control-Allow-Origin"), site);
  assert.equal(preflight.headers.get("Access-Control-Allow-Credentials"), null);
  const prod = new Request("https://reviews.example.workers.dev/v1/reviews");
  await assert.rejects(
    () =>
      verifyTurnstile(
        prod,
        { ...env, TURNSTILE_SECRET: "1x0000000000000000000000000000000AA" },
        "local-preview-only",
      ),
    /not_configured/,
  );
  env.ENVIRONMENT = "production";
  assert.equal((await submit()).status, 503);
});
test("Turnstile validates success, hostname and action, rejects replay/expired and handles outages", async () => {
  const req = new Request("https://reviews.example.workers.dev/v1/reviews");
  const env = {
    TURNSTILE_SECRET: "production-secret",
    TURNSTILE_HOSTNAMES: "amaruamazonexperiences.com",
  };
  const answer = (value) => async (_url, options) => {
    assert.equal(JSON.parse(options.body).secret, env.TURNSTILE_SECRET);
    return Response.json(value);
  };
  await verifyTurnstile(
    req,
    env,
    "valid",
    answer({
      success: true,
      hostname: "amaruamazonexperiences.com",
      action: "review",
    }),
  );
  for (const data of [
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { success: true, hostname: "evil.example", action: "review" },
    { success: true, hostname: "amaruamazonexperiences.com", action: "login" },
  ])
    await assert.rejects(
      () => verifyTurnstile(req, env, "invalid", answer(data)),
      /verification_failed/,
    );
  await assert.rejects(
    () =>
      verifyTurnstile(req, env, "token", async () => {
        throw new Error("offline");
      }),
    /verification_unavailable/,
  );
  await assert.rejects(
    () => verifyTurnstile(req, env, ""),
    /verification_failed/,
  );
});
test("rate limit is enforced; IP, Turnstile token and deletion secret never stored in plaintext", async () => {
  const { submit, sqlite } = setup();
  for (let i = 0; i < 5; i++) assert.equal((await submit()).status, 201);
  const blocked = await submit();
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("retry-after"), "3600");
  const row = sqlite.prepare("SELECT * FROM reviews LIMIT 1").get();
  assert.equal(row.status, "pending");
  assert.equal(row.deletion_hash.length, 64);
  assert.ok(!JSON.stringify(row).includes("local-preview-only"));
  const rate = sqlite.prepare("SELECT * FROM rate_limits").get();
  assert.equal(rate.key.length, 64);
  assert.ok(!rate.key.includes("local"));
});
test("author deletion uses capability; wrong secret reveals nothing; deletion cascades moderation data", async () => {
  const { submit, call, moderate, sqlite } = setup();
  const receipt = await (await submit()).json();
  await moderate(receipt.id);
  const a = await call("/v1/reviews/delete", {
    data: { id: receipt.id, deletionToken: "x".repeat(72) },
  });
  assert.equal(a.status, 200);
  assert.equal(sqlite.prepare("SELECT COUNT(*) AS n FROM reviews").get().n, 1);
  const b = await call("/v1/reviews/delete", {
    data: { id: receipt.id, deletionToken: receipt.deletionToken },
  });
  assert.equal(await a.text(), await b.text());
  assert.equal(sqlite.prepare("SELECT COUNT(*) AS n FROM reviews").get().n, 0);
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS n FROM moderation_log").get().n,
    0,
  );
});
test("pagination has no duplicates, experience filtering and stale moderation conflicts", async () => {
  const { submit, call, moderate, sqlite } = setup();
  const ids = [];
  for (let i = 0; i < 14; i++) {
    sqlite.exec("DELETE FROM rate_limits");
    const receipt = await (
      await submit({ experience: i === 13 ? "kayak" : "oje" })
    ).json();
    ids.push(receipt.id);
    await moderate(receipt.id);
  }
  const first = await (await call("/v1/reviews")).json();
  assert.equal(first.reviews.length, 12);
  assert.ok(first.next);
  const second = await (await call("/v1/reviews?before=" + first.next)).json();
  assert.equal(second.reviews.length, 2);
  assert.equal(second.next, null);
  assert.equal(
    new Set([...first.reviews, ...second.reviews].map((r) => r.id)).size,
    14,
  );
  assert.equal(
    (await (await call("/v1/reviews?experience=kayak")).json()).reviews.length,
    1,
  );
  assert.equal((await call("/v1/reviews?experience=invalid")).status, 400);
  assert.equal(
    (
      await call("/v1/admin/moderate", {
        auth: adminToken,
        origin: "http://127.0.0.1:8787",
        data: {
          id: ids[0],
          status: "hidden",
          reason: "Prueba conflicto",
          updatedAt: 1,
        },
      })
    ).status,
    409,
  );
});
test("retention removes old nonpublic data, expired public data and temporary rate identifiers", async () => {
  const { submit, moderate, env, sqlite } = setup();
  const a = await (await submit()).json(),
    b = await (await submit()).json(),
    c = await (await submit()).json();
  await moderate(b.id);
  await moderate(c.id);
  const day = 86400000;
  sqlite
    .prepare("UPDATE reviews SET updated_at=? WHERE id=?")
    .run(Date.now() - 91 * day, a.id);
  sqlite
    .prepare("UPDATE reviews SET created_at=? WHERE id=?")
    .run(Date.now() - 731 * day, b.id);
  sqlite.exec("UPDATE rate_limits SET expires_at=0");
  await cleanup(env);
  assert.deepEqual(
    sqlite
      .prepare("SELECT id FROM reviews")
      .all()
      .map((r) => r.id),
    [c.id],
  );
  assert.equal(
    sqlite.prepare("SELECT count(*) AS n FROM rate_limits").get().n,
    0,
  );
});

test('duplicate and personal-data indicators do not approve or change content; admin can erase data',async()=>{
  const {submit,call,sqlite}=setup();
  const comment='Prueba técnica duplicada: https://example.org contacto@example.org aaaaaaaaaa';
  await submit({comment});const receipt=await(await submit({comment})).json();
  const row=sqlite.prepare('SELECT * FROM reviews WHERE id=?').get(receipt.id);
  assert.equal(row.comment,comment);assert.equal(row.status,'pending');
  const flags=JSON.parse(row.flags);
  for(const flag of ['possible-duplicate','contains-link','possible-personal-data','repeated-characters'])assert.ok(flags.includes(flag));
  const data={id:receipt.id,reason:'Solicitud técnica de borrado'};
  assert.equal((await call('/v1/admin/delete',{data,origin:'http://127.0.0.1:8787'})).status,401);
  assert.equal((await call('/v1/admin/delete',{data,auth:adminToken,origin:'http://127.0.0.1:8787'})).status,200);
  assert.equal(sqlite.prepare('SELECT id FROM reviews WHERE id=?').get(receipt.id),undefined);
});
