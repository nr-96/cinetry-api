const authMiddleware = require('../shared/auth');
const trendingController = require('./trending/controller');
const discoverController = require('./discover/controller');

/**
 * Main router function to handle movies-api routes
 * @param {object} api - lambda-api
 * @returns void
 */
const router = (api) => {
  api.use(authMiddleware.verifyToken);

  api.get('/trending', trendingController.getList);

  api.get('/list', discoverController.list);
  api.get('/:movie_id', discoverController.details);
};

module.exports = router;
