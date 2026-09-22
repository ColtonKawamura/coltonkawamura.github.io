const { test, expect } = require("@playwright/test");
const { preparePage, compareWithBaseline } = require("./helpers");

// The production deployment is the reference. This fork has long since
// diverged from the upstream starter it was forked from: the content is
// personal (real publications, projects and CV, and a hidden publications
// tab) and the site runs on the v1.2 plugin architecture, while the v0.16.3
// starter ships template content on a monolithic theme. Diffing the two
// pixel-by-pixel therefore reports every content decision as a regression —
// 13 of the 54 checks failed on the v0.16.3 baseline before a single line of
// this PR changed anything — so parity now compares the candidate against
// the site that is actually live.
//
// BASELINE_URL must be the production origin — the site's own `url` in
// _config.yml — with no /al-folio subpath. The v0.16.3 gate pointed it at a
// local worktree served under /al-folio, and mixing the two conventions
// here would silently diff the wrong routes.
const routes = [
  // `path` is the logical path, origin-root-relative and identical on both sides.
  // compareWithBaseline derives each side's absolute URL from it: the baseline
  // under the production origin, the candidate under the /al-folio subpath.
  // `live` marks routes that exist on the production baseline; flipping a route
  // to live: false excludes it from parity when it has no production counterpart.
  { path: "/", id: "home", live: true },
  { path: "/projects/", id: "projects", live: true },
  // Deployed (200, styled) but not linked in the production nav; its entries
  // carry no abstracts, so it also feeds the Abs-toggle skip in
  // interactions.spec.js.
  { path: "/publications/", id: "publications", live: true },
  { path: "/repositories/", id: "repositories", live: true },
];

test.beforeEach(async ({}, testInfo) => {
  test.skip(!process.env.BASELINE_URL, "BASELINE_URL is not configured for visual parity checks.");
});

for (const theme of ["light", "dark"]) {
  for (const route of routes) {
    test(`visual parity: ${route.id} (${theme})`, async ({ page, context }, testInfo) => {
      test.skip(!route.live, "route is not deployed on the production baseline");
      await preparePage(page, theme);
      const ratio = await compareWithBaseline(context, page, route.path, theme);
      let threshold = testInfo.project.name === "mobile" ? 0.08 : 0.04;
      // Mobile dark renders more text reflow and font hinting variance than
      // the desktop baseline, so it gets the same headroom the v0.16.3 gate
      // granted it. Measured well under it against production.
      if (route.id === "repositories" && testInfo.project.name === "mobile" && theme === "dark") {
        threshold = 0.14;
      }
      expect(ratio).not.toBeNull();
      expect(ratio).toBeLessThan(threshold);
    });
  }
}
