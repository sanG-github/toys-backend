'use strict';

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async find(ctx) {
      const categories = await super.find(ctx);
      const limitProducts = 3;

      // Find first 3 products for each category, and total products
      await Promise.all(
        categories?.data?.map(async (category) => {
          const products = await strapi.db.query("api::product.product").findMany({
            where: {
              categories: {
                id: {
                  $eq: category.id
                }
              }
            },
            populate: { thumbnail: true },
            limit: limitProducts,
            orderBy: { createdAt: 'desc' },
          });

          const totalProducts = await strapi.db.query("api::product.product").count({
            where: {
              categories: {
                id: {
                  $eq: category.id
                }
              }
            },
          });

          category.attributes.highlightProducts = products;
          category.attributes.totalProducts = totalProducts;
        })
      );

      return categories;
    },
  }));
