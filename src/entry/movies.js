const api = require('lambda-api')({ base: '/movies' });
const router = require('../functions/movies/router');
const { cors } = require('../functions/shared/auth');

api.use(cors);
router(api);

/**
 * Controller to handle movies-api routes
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
