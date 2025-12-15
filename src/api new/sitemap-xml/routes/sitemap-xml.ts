export default {
  routes: [
    {
      method: "GET",
      path: "/sitemap",
      handler: "sitemap-xml.index",
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Public access
      },
    },
    {
      method: "GET",
      path: "/sitemap/:locale",
      handler: "sitemap-xml.locale",
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Public access
      },
    },
  ],
};
