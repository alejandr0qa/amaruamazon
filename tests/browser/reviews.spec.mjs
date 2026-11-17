import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
const artifact = "docs/review/2026-11-17";
const adminToken = () =>
  fs.readFileSync(".codex-preview/reviews/admin-token", "utf8").trim();
test.beforeAll(() => {
  fs.mkdirSync(artifact, { recursive: true });
  const r = spawnSync(
    process.execPath,
    [
      "node_modules/wrangler/bin/wrangler.js",
      "d1",
      "execute",
      "amaru-reviews",
      "--local",
      "--config",
      "cloudflare/reviews/wrangler.jsonc",
      "--command",
      "DELETE FROM reviews; DELETE FROM rate_limits;",
    ],
    {
      encoding: "utf8",
      env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
    },
  );
  expect(r.status, r.stderr).toBe(0);
});
test("three languages, consent, moderation, exact negative text, hiding and author deletion", async ({
  page,
  context,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [locale, path, button] of [
    ["es", "/es/", "Enviar para moderación"],
    ["en", "/", "Submit for moderation"],
    ["fr", "/fr/", "Envoyer pour modération"],
  ]) {
    await page.goto(path + "#traveller-reviews");
    await expect(page.locator("[data-review-list]")).toBeHidden();
    await page.locator("[data-review-compose]>summary").click();
    const form = page.locator("[data-review-form]");
    await form.locator("[name=experience]").selectOption("oje");
    await form.locator("[name=publicName]").fill("Prueba técnica (no viajero)");
    await form.locator('[name=rating][value="1"]').check();
    const text =
      "Prueba técnica: <img src=x onerror=alert(1)> crítica de una estrella. No corresponde a una visita real.";
    await form.locator("[name=comment]").fill(text);
    await expect(form.locator("[name=consent]")).not.toBeChecked();
    expect(await form.evaluate((f) => f.checkValidity())).toBe(false);
    await form.locator("[name=consent]").check();
    expect(await form.evaluate((f) => f.checkValidity())).toBe(true);
    if (locale === "es") {
      await form.locator('[name=publicName]').focus();
      await page.keyboard.press('Tab');
      await expect(form.locator('[name=rating][value="1"]')).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(form.locator('[name=rating][value="2"]')).toBeChecked();
      await page.keyboard.press('ArrowLeft');
      await expect(form.locator('[name=rating][value="1"]')).toBeChecked();
      await page.keyboard.press('Tab');
      await expect(form.locator('[name=comment]')).toBeFocused();
      await page
        .locator("[data-reviews]")
        .screenshot({
          path: artifact + "/reviews-desktop.png",
          style:
            ".site-header,.floating-whatsapp,.skip-link{visibility:hidden!important}",
        });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator("[data-review-compose]").scrollIntoViewIfNeeded();
      await page
        .locator("[data-reviews]")
        .screenshot({
          path: artifact + "/reviews-mobile.png",
          style:
            ".site-header,.floating-whatsapp,.skip-link{visibility:hidden!important}",
        });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const a11y = await new AxeBuilder({ page })
        .include("[data-reviews]")
        .analyze();
      expect(a11y.violations).toEqual([]);
      fs.writeFileSync(
        artifact + "/accessibility-reviews.json",
        JSON.stringify(
          { violations: a11y.violations, passes: a11y.passes.map((p) => p.id) },
          null,
          2,
        ),
      );
      await page.setViewportSize({ width: 1366, height: 900 });
    }
    const responsePromise = page.waitForResponse(
      (r) => r.url().endsWith("/v1/reviews") && r.request().method() === "POST",
    );
    await form.getByRole("button", { name: button }).click();
    const response = await responsePromise;
    expect(response.status()).toBe(201);
    const receipt = await response.json();
    await expect(page.locator("[data-review-receipt]")).toBeVisible();
    expect(await page.locator("[data-review-code]").inputValue()).toContain(
      receipt.deletionToken,
    );
    const publicBefore = await context.request.get(
      "http://127.0.0.1:8787/v1/reviews",
    );
    expect((await publicBefore.json()).reviews).toEqual([]);
    if (locale === "es") {
      const admin = await context.newPage();
      await admin.goto("http://127.0.0.1:8787/admin");
      await admin.locator("#token").fill(adminToken());
      await admin.getByRole("button", { name: "Entrar", exact: true }).click();
      await expect(admin.locator("article")).toHaveCount(1);
      await expect(admin.locator("blockquote")).toHaveText(text);
      await admin.screenshot({
        path: artifact + "/moderation-pending.png",
        fullPage: true,
      });
      const a11y = await new AxeBuilder({ page: admin }).analyze();
      expect(a11y.violations).toEqual([]);
      await admin
        .locator("article textarea")
        .fill("Prueba local: aprobación explícita para comprobar el flujo.");
      await admin.getByRole("button", { name: "Aprobar", exact: true }).click();
      await expect(admin.locator("article")).toHaveCount(0);
      const approved = await context.request.get(
        "http://127.0.0.1:8787/v1/reviews",
      );
      expect((await approved.json()).reviews[0].comment).toBe(text);
      // Retain the receipt in this tab; a second tab verifies public rendering.
      const publicPage = await context.newPage();
      await publicPage.goto("/es/#traveller-reviews");
      await expect(
        publicPage.locator("[data-review-list] blockquote"),
      ).toHaveText(text);
      await expect(publicPage.locator("[data-review-list] img")).toHaveCount(0);
      await admin.locator("#filter").selectOption("approved");
      await expect(admin.locator("article")).toHaveCount(1);
      await admin
        .locator("article textarea")
        .fill("Prueba local de ocultación, sin alterar texto ni estrellas.");
      await admin.getByRole("button", { name: "Ocultar", exact: true }).click();
      await expect(admin.locator("article")).toHaveCount(0);
      await publicPage.reload();
      await expect(publicPage.locator("[data-review-list]")).toBeHidden();
      await publicPage.close();
      await admin.close();
    }
    await page.locator("[data-review-delete-panel]>summary").click();
    const deletion = page.locator("[data-review-delete]");
    const deletionResponse = page.waitForResponse((r) =>
      r.url().endsWith("/v1/reviews/delete"),
    );
    await deletion.getByRole("button").click();
    expect((await deletionResponse).status()).toBe(200);
    await expect(page.locator("[data-review-receipt]")).toBeHidden();
  }
  expect(errors).toEqual([]);
});
test("all selected experience guides, no JS content, language equivalence and lazy requests", async ({
  browser,
}) => {
  const paths = [
    "/experiences/oje-tree/",
    "/fr/experiences/canoe-foret-inondee/",
    "/fr/experiences/san-antonio-cacao-victoria-regia-paresseux/",
    "/fr/experiences/kayak-de-jour-amazonie/",
    "/experiences/flooded-forest-canoeing/",
  ];
  const evidence = [];
  const context = await browser.newContext({ javaScriptEnabled: false });
  for (const path of paths) {
    const page = await context.newPage();
    const response = await page.goto(
      "https://amaruamazonexperiences.com" + path,
    );
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.locator("main").innerText()).toContain(
      await page.locator("h1").innerText(),
    );
    evidence.push({
      path,
      status: response.status(),
      h1: await page.locator("h1").innerText(),
      noJavaScript: true,
    });
    await page.close();
  }
  await context.close();
  const activeContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const active = await activeContext.newPage();
  const requests = [];
  active.on("request", (r) => requests.push(r.url()));
  await active.goto("http://127.0.0.1:8077/");
  await active.waitForLoadState("networkidle");
  expect(
    requests.filter(
      (u) =>
        u.includes(":8787") ||
        u.includes("challenges.cloudflare.com") ||
        u.includes(".mp4"),
    ),
  ).toEqual([]);
  await active.goto(
    "http://127.0.0.1:8077/fr/experiences/kayak-de-jour-amazonie/#traveller-reviews",
  );
  await active.locator("[data-review-compose]>summary").click();
  await expect(active.locator("[data-review-form] select")).toHaveValue(
    "kayak",
  );
  expect(
    await active.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await active.screenshot({
    path: artifact + "/reviews-experience-fr-mobile.png",
  });
  const result = await new AxeBuilder({ page: active })
    .include("[data-reviews]")
    .analyze();
  expect(result.violations).toEqual([]);
  fs.writeFileSync(
    artifact + "/browser-evidence.json",
    JSON.stringify(
      {
        publicRendering: evidence,
        initialRequests: requests.filter(
          (u) => !u.includes("127.0.0.1:8077/fr/"),
        ),
        reviewA11yViolations: result.violations,
      },
      null,
      2,
    ),
  );
  await activeContext.close();
});
test("network failure preserves text; disabled production config offers email with no false success", async ({
  page,
}) => {
  await page.goto("/es/#traveller-reviews");
  await page.locator("[data-review-compose]>summary").click();
  const form = page.locator("[data-review-form]");
  await form.locator("[name=experience]").selectOption("kayak");
  await form.locator("[name=publicName]").fill("Prueba técnica");
  await form.locator('[name=rating][value="2"]').check();
  await form
    .locator("[name=comment]")
    .fill("Texto de prueba conservado cuando falla la conexión.");
  await form.locator("[name=consent]").check();
  await page.route("**/v1/reviews", (route) => route.abort());
  await form.getByRole("button").click();
  await expect(page.locator("[data-review-status]")).toContainText(
    "Tu texto sigue aquí",
  );
  await expect(form.locator("[name=comment]")).toHaveValue(
    "Texto de prueba conservado cuando falla la conexión.",
  );
  await expect(page.locator("[data-review-receipt]")).toBeHidden();
  await page.unrouteAll();
  await page.route("**/reviews-config.js*", (route) =>
    route.fulfill({
      contentType: "text/javascript",
      body: "window.AMARU_REVIEWS={apiBase:'',turnstileSiteKey:''};",
    }),
  );
  await page.reload();
  await page.locator("[data-review-compose]>summary").click();
  await expect(page.locator("[data-review-unavailable]")).toBeVisible();
  await expect(page.locator("[data-review-form] button")).toBeDisabled();
});

test('Turnstile loads on opening only and handles expiration, recovery and retry',async({page})=>{
  let scriptLoads=0;
  await page.route('**/reviews-config.js*',route=>route.fulfill({contentType:'text/javascript',body:'window.AMARU_REVIEWS={apiBase:"http://127.0.0.1:8787",turnstileSiteKey:"test-fixture",localPreview:false};'}));
  await page.route('https://challenges.cloudflare.com/turnstile/**',route=>{scriptLoads++;return route.fulfill({contentType:'text/javascript',body:'window.turnstile={render:function(el,options){window.challengeOptions=options;return "fixture";},reset:function(){window.challengeResets=(window.challengeResets||0)+1;}};'});});
  await page.goto('/es/#traveller-reviews');expect(scriptLoads).toBe(0);
  await page.locator('[data-review-compose]>summary').click();await expect.poll(()=>scriptLoads).toBe(1);
  await expect.poll(()=>page.evaluate(()=>window.challengeOptions?.action)).toBe('review');
  expect(await page.evaluate(()=>window.challengeOptions.language)).toBe('es');
  const form=page.locator('[data-review-form]');await form.locator('[name=experience]').selectOption('oje');await form.locator('[name=publicName]').fill('Prueba técnica');await form.locator('[name=rating][value="3"]').check();await form.locator('[name=comment]').fill('Prueba técnica de verificación, sin experiencia real.');await form.locator('[name=consent]').check();
  await page.evaluate(()=>{window.challengeOptions.callback('first-token');window.challengeOptions['expired-callback']();});
  await form.getByRole('button').click();await expect(page.locator('[data-review-status]')).toContainText('Completa la verificación');
  await page.evaluate(()=>window.challengeOptions['error-callback']());await expect(page.locator('[data-review-status]')).toContainText('Completa la verificación');
  await page.evaluate(()=>window.challengeOptions.callback('replacement-token'));
  await page.route('**/v1/reviews',route=>route.fulfill({status:503,contentType:'application/json',body:'{"error":"verification_unavailable"}'}));
  await form.getByRole('button').click();await expect(page.locator('[data-review-status]')).toContainText('Tu texto sigue aquí');expect(await page.evaluate(()=>window.challengeResets)).toBe(1);
  await page.locator('[data-review-compose]>summary').click();await page.locator('[data-review-compose]>summary').click();expect(scriptLoads).toBe(1);
});
