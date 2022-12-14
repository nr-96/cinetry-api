const api = require('lambda-api')({ base: '/auth' });
const router = require('../functions/auth/router');
const { cors } = require('../functions/shared/auth');

api.use(cors);
router(api);

/**
 * Controller to handle auth routes
 * @param {object} event
 * @param {object} context
 * @returns Promise
 */
const controller = (event, context) => {
  console.info('event:', JSON.stringify(event));
  console.info('context:', JSON.stringify(context));

  return api.run(event, context);
};

module.exports = controller;
