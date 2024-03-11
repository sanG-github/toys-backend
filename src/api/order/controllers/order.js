'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// const sendEmail = async (ctx, next) => {
//   await strapi.plugins['email'].services.email.send({
//     to: 'sanghuynh200000@gmail.com',
//     from: 'contact@shop.com',
//     subject: 'Order created',
//     text: 'Your order has been created successfully',
//   });

//   return await next();
// };

// strapi.plugins['order'].controllers.order.create = [
//   sendEmail,
//   ...strapi.plugins['order'].controllers.order.create,
// ];

module.exports = createCoreController('api::order.order');
