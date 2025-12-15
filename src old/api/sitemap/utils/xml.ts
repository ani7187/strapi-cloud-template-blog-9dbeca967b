// export const buildSitemapIndexXml = (sitemaps: { loc: string }[]): string => {
//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${sitemaps
//   .map(
//     (sitemap) => `  <sitemap>
//     <loc>${sitemap.loc}</loc>
//   </sitemap>`
//   )
//   .join("\n")}
// </sitemapindex>`;
//   return xml;
// };

// export const buildUrlSetXml = (urls: { loc: string }[]): string => {
//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${urls
//   .map(
//     (url) => `  <url>
//     <loc>${url.loc}</loc>
//   </url>`
//   )
//   .join("\n")}
// </urlset>`;
//   return xml;
// };
