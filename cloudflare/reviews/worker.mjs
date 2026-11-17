import adminHtml from "./admin.html";
import adminJs from "./admin.js.txt";
import adminCss from "./admin.css.txt";
import { experiencePages } from "../../src/experience-pages.mjs";

const CONSENT = "2026-11-17-v1";
const statuses = ["pending", "approved", "rejected", "hidden"];
const DAY = 86400000;
const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
      ...headers,
    },
  });
const fail = (status, code) => {
  throw Object.assign(new Error(code), { status, code });
};
const hash = async (value) =>
  [
    ...new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    ),
  ]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
const local = (request) =>
  ["127.0.0.1", "localhost", "[::1]"].includes(new URL(request.url).hostname);
const dev = (request, env) => env.ENVIRONMENT === "local" && local(request);
async function body(request) {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    fail(415, "json_required");
  if (Number(request.headers.get("content-length")) > 12000)
    fail(413, "too_large");
  const reader = request.body?.getReader();
  if (!reader) fail(400, "invalid_json");
  let size = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 12000) {
      await reader.cancel();
      fail(413, "too_large");
    }
    chunks.push(value);
  }
  try {
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const c of chunks) {
      bytes.set(c, offset);
      offset += c.length;
    }
    const value = JSON.parse(new TextDecoder().decode(bytes));
    if (!value || typeof value !== "object" || Array.isArray(value))
      fail(400, "invalid_json");
    return value;
  } catch {
    fail(400, "invalid_json");
  }
}
function clean(value, min, max) {
  if (
    typeof value !== "string" ||
    value.trim().length < min ||
    value.length > max ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u.test(
      value,
    )
  )
    fail(400, "invalid_fields");
  return value; // Preserve original text; moderation cannot edit it.
}
async function rate(request, env, kind, max) {
  if (!env.RATE_SECRET || env.RATE_SECRET.length < 32)
    fail(503, "not_configured");
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    (dev(request, env) ? "local" : "unknown");
  const hour = Math.floor(Date.now() / 3600000);
  const key = await hash(`${env.RATE_SECRET}:${kind}:${hour}:${ip}`);
  const row = await env.DB.prepare(
    "INSERT INTO rate_limits(key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count",
  )
    .bind(key, (hour + 2) * 3600000)
    .first();
  if (row.count > max) fail(429, "rate_limited");
}
export async function verifyTurnstile(request, env, token, fetcher = fetch) {
  if (dev(request, env) && token === "local-preview-only") return;
  if (
    !env.TURNSTILE_SECRET ||
    (!dev(request, env) && env.TURNSTILE_SECRET.startsWith("1x000"))
  )
    fail(503, "not_configured");
  if (typeof token !== "string" || !token.length || token.length > 2048)
    fail(400, "verification_failed");
  let result;
  try {
    const r = await fetcher(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET, response: token }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!r.ok) fail(503, "verification_unavailable");
    result = await r.json();
  } catch {
    fail(503, "verification_unavailable");
  }
  if (
    !result.success ||
    result.action !== "review" ||
    !env.TURNSTILE_HOSTNAMES?.split(",").includes(result.hostname)
  )
    fail(400, "verification_failed");
}
async function admin(request, env) {
  await rate(request, env, "admin", 60);
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!env.ADMIN_TOKEN || env.ADMIN_TOKEN.length < 32)
    fail(503, "not_configured");
  if (
    !token ||
    token.length > 256 ||
    (await hash(token)) !== (await hash(env.ADMIN_TOKEN))
  )
    fail(401, "unauthorized");
}
const publicColumns =
  "id,experience,language,public_name,rating,comment,created_at";
async function route(request, env) {
  const url = new URL(request.url),
    p = url.pathname;
  if (!local(request) && url.protocol !== "https:") fail(400, "https_required");
  if (env.ENVIRONMENT === "local" && !local(request)) fail(503, "local_only");
  const siteOrigins = (env.ALLOWED_ORIGINS || "").split(",");
  const origin = request.headers.get("origin");
  const adminPath = p.startsWith("/v1/admin/");
  if (
    origin &&
    !(adminPath
      ? origin === url.origin
      : siteOrigins.includes(origin) || origin === url.origin)
  )
    fail(403, "origin_denied");
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (
    request.method === "GET" &&
    ["/admin", "/admin.js", "/admin.css"].includes(p)
  ) {
    return new Response(
      p === "/admin" ? adminHtml : p === "/admin.js" ? adminJs : adminCss,
      {
        headers: {
          "Content-Type":
            p === "/admin"
              ? "text/html; charset=utf-8"
              : p === "/admin.js"
                ? "text/javascript; charset=utf-8"
                : "text/css; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
          "X-Content-Type-Options": "nosniff",
          "Content-Security-Policy":
            "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
          "Referrer-Policy": "no-referrer",
        },
      },
    );
  }
  if (p === "/v1/reviews" && request.method === "GET") {
    const experience = url.searchParams.get("experience") || "";
    if (experience && !Object.hasOwn(experiencePages, experience))
      fail(400, "invalid_experience");
    const before = Number(
      url.searchParams.get("before") || Number.MAX_SAFE_INTEGER,
    );
    if (!Number.isSafeInteger(before) || before < 1)
      fail(400, "invalid_cursor");
    // Integer rowid gives a stable keyset cursor, also for simultaneous submissions.
    const where = experience ? " AND experience=?" : "";
    const args = experience ? [before, experience] : [before];
    const { results } = await env.DB.prepare(
      `SELECT rowid AS cursor,${publicColumns} FROM reviews WHERE status='approved' AND rowid<?${where} ORDER BY rowid DESC LIMIT 13`,
    )
      .bind(...args)
      .all();
    return json({
      reviews: results.slice(0, 12).map(({ cursor, ...row }) => row),
      next: results.length > 12 ? results[11].cursor : null,
    });
  }
  if (p === "/v1/reviews" && request.method === "POST") {
    if (!origin || !siteOrigins.includes(origin)) fail(403, "origin_denied");
    await rate(request, env, "submit", 5);
    const b = await body(request);
    if (
      !Object.hasOwn(experiencePages, b.experience) ||
      !["en", "es", "fr"].includes(b.language) ||
      !Number.isInteger(b.rating) ||
      b.rating < 1 ||
      b.rating > 5 ||
      b.consent !== true ||
      b.consentVersion !== CONSENT
    )
      fail(400, "invalid_fields");
    const name = clean(b.publicName, 2, 80),
      comment = clean(b.comment, 20, 2000);
    if (b.website) fail(400, "verification_failed");
    await verifyTurnstile(request, env, b.turnstileToken);
    const flags = [];
    const contentHash = await hash(
      `${b.experience}:${comment.trim().toLowerCase()}`,
    );
    if (
      await env.DB.prepare(
        "SELECT id FROM reviews WHERE content_hash=? LIMIT 1",
      )
        .bind(contentHash)
        .first()
    )
      flags.push("possible-duplicate");
    if (/https?:\/\/|www\./i.test(comment)) flags.push("contains-link");
    if (/(.)\1{8,}/u.test(comment)) flags.push("repeated-characters");
    if (/\b[^\s@]+@[^\s@]+\.[^\s@]+\b|(?:\+\d[\d ()-]{8,}\d)/u.test(comment))
      flags.push("possible-personal-data");
    const id = crypto.randomUUID(),
      deletionToken = crypto.randomUUID() + crypto.randomUUID();
    const now = Date.now();
    await env.DB.prepare(
      "INSERT INTO reviews(id,experience,language,public_name,rating,comment,consent_version,consent_at,created_at,updated_at,deletion_hash,content_hash,flags) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    )
      .bind(
        id,
        b.experience,
        b.language,
        name,
        b.rating,
        comment,
        CONSENT,
        now,
        now,
        now,
        await hash(deletionToken),
        contentHash,
        JSON.stringify(flags),
      )
      .run();
    return json({ id, status: "pending", deletionToken }, 201);
  }
  if (p === "/v1/reviews/delete" && request.method === "POST") {
    if (!origin || !siteOrigins.includes(origin)) fail(403, "origin_denied");
    await rate(request, env, "delete", 10);
    const b = await body(request);
    clean(b.id, 36, 36);
    clean(b.deletionToken, 72, 72);
    // A capability returned once to the author; never expose its hash publicly.
    await env.DB.prepare("DELETE FROM reviews WHERE id=? AND deletion_hash=?")
      .bind(b.id, await hash(b.deletionToken))
      .run();
    return json({ ok: true }); // Uniform response does not reveal whether an ID exists.
  }
  if (adminPath) {
    await admin(request, env);
    if (p === "/v1/admin/reviews" && request.method === "GET") {
      const status = url.searchParams.get("status") || "pending";
      const before = Number(
        url.searchParams.get("before") || Number.MAX_SAFE_INTEGER,
      );
      if (
        !statuses.includes(status) ||
        !Number.isSafeInteger(before) ||
        before < 1
      )
        fail(400, "invalid_fields");
      const { results } = await env.DB.prepare(
        "SELECT rowid AS cursor,id,experience,language,public_name,rating,comment,status,consent_version,consent_at,created_at,updated_at,flags,moderation_reason FROM reviews WHERE status=? AND rowid<? ORDER BY rowid DESC LIMIT 26",
      )
        .bind(status, before)
        .all();
      return json({
        reviews: results.slice(0, 25),
        next: results.length > 25 ? results[24].cursor : null,
      });
    }
    if (p === "/v1/admin/moderate" && request.method === "POST") {
      const b = await body(request);
      clean(b.id, 36, 36);
      if (!statuses.includes(b.status) || b.status === "pending")
        fail(400, "invalid_status");
      const reason = clean(b.reason, 5, 300);
      if (!Number.isSafeInteger(b.updatedAt)) fail(400, "invalid_fields");
      const now = Date.now();
      // Both statements are transactional; optimistic locking prevents stale moderation.
      const batch = await env.DB.batch([
        env.DB.prepare(
          "INSERT INTO moderation_log(review_id,action,reason,created_at) SELECT id,?,?,? FROM reviews WHERE id=? AND updated_at=?",
        ).bind(b.status, reason, now, b.id, b.updatedAt),
        env.DB.prepare(
          "UPDATE reviews SET status=?,moderation_reason=?,updated_at=? WHERE id=? AND updated_at=?",
        ).bind(b.status, reason, now, b.id, b.updatedAt),
      ]);
      if (!batch[1].meta.changes) fail(409, "stale_review");
      return json({ ok: true });
    }
    if (p === "/v1/admin/delete" && request.method === "POST") {
      const b = await body(request);
      clean(b.id, 36, 36);
      clean(b.reason, 5, 300);
      await env.DB.prepare("DELETE FROM reviews WHERE id=?").bind(b.id).run();
      return json({ ok: true });
    }
  }
  fail(404, "not_found");
}
export async function cleanup(env) {
  const now = Date.now();
  // Indexed SQL runs in D1; waiting for D1 does not consume Worker CPU time.
  await env.DB.batch([
    env.DB.prepare("DELETE FROM rate_limits WHERE expires_at<?").bind(now),
    env.DB.prepare(
      "DELETE FROM reviews WHERE status IN ('pending','rejected','hidden') AND updated_at<?",
    ).bind(now - 90 * DAY),
    env.DB.prepare(
      "DELETE FROM reviews WHERE status='approved' AND created_at<?",
    ).bind(now - 730 * DAY),
  ]);
}
export default {
  async fetch(request, env) {
    let response;
    try {
      response = await route(request, env);
    } catch (e) {
      response = json(
        { error: e.code || "temporarily_unavailable" },
        e.status || 503,
      );
    }
    const origin = request.headers.get("origin");
    const headers = new Headers(response.headers);
    if (
      origin &&
      (env.ALLOWED_ORIGINS || "").split(",").includes(origin) &&
      !new URL(request.url).pathname.startsWith("/v1/admin/")
    ) {
      headers.set("Access-Control-Allow-Origin", origin);
      headers.set("Vary", "Origin");
      headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      headers.set("Access-Control-Allow-Headers", "Content-Type");
    }
    if (response.status === 429) headers.set("Retry-After", "3600");
    return new Response(response.body, { status: response.status, headers });
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(cleanup(env));
  },
};
