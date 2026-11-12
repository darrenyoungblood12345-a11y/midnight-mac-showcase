/**
 * The site's base path in the form Vite wants: "/" for a site at the root of its domain,
 * "/<repository>/" for a GitHub Pages project site. Takes what the Pages workflow passes
 * ("" or "/<repository>") and tolerates missing or doubled slashes.
 */
export const normalizeBasePath = (value: string | undefined): string => {
  const segments = (value ?? "").split("/").filter(Boolean);
  return segments.length > 0 ? `/${segments.join("/")}/` : "/";
};

/**
 * A URL under the site's base path, for the few plain links and files that do not go through
 * the router (router links already follow the base). siteUrl() is the home page.
 */
export const siteUrl = (path = ""): string => `${import.meta.env.BASE_URL}${path}`;
