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

      // Find first 3 products for each category, and total products
      await Promise.all(
        categories?.data?.map(async (category) => {
          const products = await strapi.service("api::product.product").find({
            category: category.id,
            _limit: 3,
            _sort: "createdAt:desc",
          });

          const totalProducts = await strapi.db.query("api::product.product").count({
            category: category.id,
          });

          category.highlightProducts = products.results;
          category.totalProducts = totalProducts;
        })
      );

      return categories;
    },
  }));
