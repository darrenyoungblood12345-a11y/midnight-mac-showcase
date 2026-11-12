// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { normalizeBasePath } from "./src/lib/base-path";

// Where the site is served from. GitHub Pages serves a project site from /<repository>/ and a
// user site or custom domain from /; the Pages workflow passes whichever applies in
// SITE_BASE_PATH. TanStack Start derives the router basepath from Vite's base, so asset URLs,
// routes, links and prerendered pages all follow this one value. The paths in `pages` below
// stay relative to it.
const base = normalizeBasePath(process.env["SITE_BASE_PATH"]);

export default defineConfig({
  vite: { base },
  // Pin the server bundle so GitHub Actions does not auto-detect another host.
  // Prerendered HTML in .output/public is what GitHub Pages publishes.
  nitro: { preset: "cloudflare-module" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      concurrency: 4,
    },
    pages: [
      { path: "/" },
      { path: "/website" },
      { path: "/compare" },
      { path: "/contribute" },
      { path: "/demo" },
      { path: "/download" },
      { path: "/network" },
      { path: "/pricing" },
      { path: "/app" },
      { path: "/app/connect" },
      { path: "/app/chat" },
      { path: "/app/code" },
      { path: "/app/contribute" },
      { path: "/app/wallet" },
      { path: "/app/leaderboard" },
      { path: "/app/account" },
    ],
  },
});
