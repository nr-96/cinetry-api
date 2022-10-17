const api = require('lambda-api')({ base: '/users' });
const router = require('../functions/users/router');

/**
 * Controller to handle users-api routes
 * @param {object} event
 * @param {object} context
 * @returns Promise
 */
const controller = (event, context) => {
  console.info('event:', JSON.stringify(event));
  console.info('context:', JSON.stringify(context));
  router(api);

  return api.run(event, context);
};

module.exports = controller;
