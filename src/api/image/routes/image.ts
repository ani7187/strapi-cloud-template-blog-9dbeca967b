export default {
  routes: [
    {
     method: 'GET',
     path: '/image/:file',
     handler: 'image.resize',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
