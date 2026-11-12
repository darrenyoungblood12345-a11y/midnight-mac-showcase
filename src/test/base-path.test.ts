import { afterEach, describe, expect, it, vi } from "vitest";

import { normalizeBasePath, siteUrl } from "@/lib/base-path";
import { Route as rootRoute } from "@/routes/__root";
import { Route as compareRoute } from "@/routes/compare";
import { Route as websiteRoute } from "@/routes/website";

type Head = {
  meta?: Array<Record<string, unknown>>;
  links?: Array<Record<string, unknown>>;
};
// head() takes the match context, which none of these routes read.
const headOf = (route: { options: { head?: unknown } }) =>
  (route.options.head as () => Head | undefined)() ?? {};

describe("Site base path", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("turns what the Pages workflow passes into a Vite base", () => {
    expect(normalizeBasePath(undefined)).toBe("/");
    expect(normalizeBasePath("")).toBe("/");
    expect(normalizeBasePath("/")).toBe("/");
    expect(normalizeBasePath("/midnight-mac-showcase")).toBe("/midnight-mac-showcase/");
    expect(normalizeBasePath("midnight-mac-showcase/")).toBe("/midnight-mac-showcase/");
  });

  it("keeps plain links at the domain root when the site is served there", () => {
    expect(siteUrl()).toBe("/");
    expect(headOf(compareRoute).meta).toContainEqual({ httpEquiv: "refresh", content: "0; url=/" });
    expect(headOf(rootRoute).links).toContainEqual({
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    });
  });

  // A GitHub Pages project site lives under /<repository>/: a link to "/" leaves the site.
  it("sends plain links to the project subpath when the site is served from one", () => {
    vi.stubEnv("BASE_URL", "/midnight-mac-showcase/");

    expect(siteUrl()).toBe("/midnight-mac-showcase/");
    for (const moved of [compareRoute, websiteRoute]) {
      const head = headOf(moved);
      expect(head.meta).toContainEqual({
        httpEquiv: "refresh",
        content: "0; url=/midnight-mac-showcase/",
      });
      expect(head.links).toContainEqual({ rel: "canonical", href: "/midnight-mac-showcase/" });
    }
    expect(headOf(rootRoute).links).toContainEqual({
      rel: "icon",
      href: "/midnight-mac-showcase/favicon.ico",
      type: "image/x-icon",
    });
  });
});
