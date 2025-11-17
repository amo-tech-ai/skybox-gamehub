import { useEffect } from "react";
import { useAllEvents } from "@/hooks/useEvents";
import { Loader2 } from "lucide-react";

/**
 * Sitemap page that generates an XML sitemap for search engines
 * This should ideally be served as /sitemap.xml via server-side rendering
 * For now, it provides a human-readable version and XML structure
 */
const Sitemap = () => {
  const { data: events, isLoading } = useAllEvents();

  useEffect(() => {
    // Set proper content type for XML if serving as sitemap.xml
    if (window.location.pathname === '/sitemap.xml') {
      document.querySelector('meta[http-equiv="Content-Type"]')?.setAttribute(
        'content',
        'application/xml; charset=utf-8'
      );
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-accent" />
          <p className="text-muted-foreground">Generating sitemap...</p>
        </div>
      </div>
    );
  }

  const baseUrl = "https://skyboxmedellin.com";
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily", lastmod: undefined },
    { url: "/events", priority: "0.9", changefreq: "daily", lastmod: undefined },
    { url: "/sports", priority: "0.8", changefreq: "weekly", lastmod: undefined },
    { url: "/menu", priority: "0.7", changefreq: "weekly", lastmod: undefined },
    { url: "/gallery", priority: "0.6", changefreq: "weekly", lastmod: undefined },
    { url: "/contact", priority: "0.7", changefreq: "monthly", lastmod: undefined },
    { url: "/reserve", priority: "0.8", changefreq: "weekly", lastmod: undefined },
    { url: "/private-events", priority: "0.7", changefreq: "monthly", lastmod: undefined },
    { url: "/vip", priority: "0.7", changefreq: "monthly", lastmod: undefined },
  ];

  const eventPages = events?.map((event) => ({
    url: `/events/${event.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: new Date(event.event_date).toISOString(),
  })) || [];

  const allPages = [...staticPages, ...eventPages];

  // Generate XML sitemap structure
  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Sitemap</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Static Pages</h2>
          <ul className="space-y-2">
            {staticPages.map((page) => (
              <li key={page.url}>
                <a
                  href={page.url}
                  className="text-primary hover:underline"
                >
                  {baseUrl}{page.url}
                </a>
                <span className="text-sm text-muted-foreground ml-2">
                  (Priority: {page.priority})
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Event Pages ({eventPages.length})
          </h2>
          <ul className="space-y-2">
            {eventPages.map((page) => (
              <li key={page.url}>
                <a
                  href={page.url}
                  className="text-primary hover:underline"
                >
                  {baseUrl}{page.url}
                </a>
                <span className="text-sm text-muted-foreground ml-2">
                  (Priority: {page.priority})
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">XML Sitemap</h2>
          <p className="text-muted-foreground mb-4">
            Copy this XML and save it as <code className="bg-muted px-2 py-1 rounded">sitemap.xml</code> in your public directory:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
            <code>{xmlSitemap}</code>
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(xmlSitemap);
              alert("Sitemap XML copied to clipboard!");
            }}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Copy XML to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
