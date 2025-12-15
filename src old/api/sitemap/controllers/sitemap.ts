// /**
//  * sitemap controller
//  */

// import { factories } from "@strapi/strapi";

// export default factories.createCoreController(
//   "api::sitemap.sitemap",
//   ({ strapi }) => ({
//     async index(ctx) {
//       try {
//         const sitemapService = strapi.service("api::sitemap.sitemap");
//         const locales = await sitemapService.getLocales();
//         const origin = ctx.request.origin || "https://your-domain.com"; // Fallback if origin not present

//         const xml = sitemapService.buildSitemapIndex(locales, origin);

//         ctx.set("Content-Type", "application/xml");
//         ctx.body = xml;
//       } catch (err) {
//         ctx.throw(500, err);
//       }
//     },

//     async locale(ctx) {
//       try {
//         const { locale } = ctx.params;
//         const sitemapService = strapi.service("api::sitemap.sitemap");

//         // Validate locale?
//         // Optional: check if locale exists in active locales.
//         // For now, we proceed to try and generate.

//         const contentTypes = sitemapService.getContentTypes();
//         const filteredTypes = sitemapService.filterContentTypes(contentTypes);
//         const origin = ctx.request.origin || "https://your-domain.com";

//         const xml = await sitemapService.buildLocaleSitemap(
//           locale,
//           filteredTypes,
//           origin
//         );

//         ctx.set("Content-Type", "application/xml");
//         ctx.body = xml;
//       } catch (err) {
//         ctx.throw(500, err);
//       }
//     },
//   })
// );
