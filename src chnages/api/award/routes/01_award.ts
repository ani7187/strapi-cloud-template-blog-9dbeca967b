export default {
    routes: [
      {
        method: 'GET',
        path: '/awards/years',
        handler: 'award.getUniqueYears',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/awards/products',
        handler: 'award.findProducts',
        config: {
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/awards/categories',
        handler: 'award.findCategories',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  