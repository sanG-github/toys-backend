'use strict';

/**
 * menu-header controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  "api::menu-header.menu-header",
  ({ strapi }) => ({
    async find(ctx) {
      let menuHeaders = await strapi.db.query("api::menu-header.menu-header")
        .findMany({
          populate: { subMenus: true },
          orderBy: { createdAt: 'desc' },
        })

      // Custom logic to count total products for each sub-menus
      menuHeaders = await Promise.all(
        menuHeaders.map(async (menuHeader) => {
          const customSubMenus = menuHeader.subMenus.map(async (category) => {
            const totalProducts = await strapi.db.query("api::product.product").count({
              where: {
                categories: {
                  id: {
                    $eq: category.id
                  }
                }
              },
            });

            category.totalProducts = totalProducts;

            return category;
          })

          menuHeader.subMenus = await Promise.all(customSubMenus);

          return menuHeader;
        })
      );

      return menuHeaders;
    },
  }));
