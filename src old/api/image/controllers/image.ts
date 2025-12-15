import { Context } from 'koa';

export default {
  async resize(ctx: Context) {
    const fileParam = ctx.params.file as string;

    //Validate input
    if (!fileParam) {
      ctx.status = 400;
      ctx.body = { error: 'File parameter is required' };
      return;
    }

    try {
      //Call service
      const result = await strapi.service('api::image.image').resizeImage(fileParam);

      if (result?.redirect) {
        ctx.redirect(result.redirect);
        return;
      }

      //Fallback if no redirect
      ctx.status = 404;
      ctx.body = { error: 'Resized file not found' };

    } catch (err: any) {
      if (err.message === 'Original image not found') {
        ctx.status = 404;
        ctx.body = { error: err.message };
      } else if (err.message === 'Invalid file name') {
        ctx.status = 400;
        ctx.body = { error: err.message };
      } else {
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
      }
    }
  },
};
