export default {
  routes: [
    {
      method: "GET",
      path: "/expos/years",
      handler: "expo.getYears",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
