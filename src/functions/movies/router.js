const trendingController = require('./trending/controller');

/**
 * Main router function to handle movies-api routes
 * @param {object} api - lambda-api
 * @returns void
 */
const router = (api) => {
  api.get('/trending', trendingController.getList);
};

module.exports = router;