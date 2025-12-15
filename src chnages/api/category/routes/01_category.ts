export default {
  routes: [
    {
      method: "GET",
      path: "/categories/by-type/:type",
      handler: "category.getCategoriesByType",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
