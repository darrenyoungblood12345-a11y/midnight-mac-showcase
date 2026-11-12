import { createFileRoute } from "@tanstack/react-router";

import { siteUrl } from "@/lib/base-path";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [{ title: "SlashCompute" }, { httpEquiv: "refresh", content: `0; url=${siteUrl()}` }],
    links: [{ rel: "canonical", href: siteUrl() }],
  }),
  component: RedirectHome,
});

function RedirectHome() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p>
        This page has moved. <a href={siteUrl()}>Continue to the website</a>
      </p>
      <script
        dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(siteUrl())})` }}
      />
    </main>
  );
}
