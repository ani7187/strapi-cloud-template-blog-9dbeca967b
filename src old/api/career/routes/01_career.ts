/**
 * Custom routes for career controller
 */

export default {
    routes: [
    {
      method: 'GET',
      path: '/career/filters',
      handler: 'career.filters',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
  };
  
