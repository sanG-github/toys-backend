'use strict';

/**
 * application-asset service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::application-asset.application-asset');
