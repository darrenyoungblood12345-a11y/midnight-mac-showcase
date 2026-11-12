import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Tests run from the project root.
const publicDir = join(process.cwd(), "public");

const filesUnder = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? filesUnder(join(dir, entry.name)) : [join(dir, entry.name)],
  );

// Everything under public/ is published as it is. This site has no backend, so a form on a
// static page submits to its own URL, and a password typed into it ends up in the address
// bar, the browser history and request logs.
describe("Published static files", () => {
  it("include no page with a password field", () => {
    const pagesWithPasswords = filesUnder(publicDir)
      .filter((file) => /\.html?$/i.test(file))
      .filter((file) => /type\s*=\s*["']?password/i.test(readFileSync(file, "utf8")));

    expect(pagesWithPasswords).toEqual([]);
  });
});
