const authMiddleware = require('../shared/auth');
const trendingController = require('./trending/controller');
const discoverController = require('./discover/controller');
const interactionController = require('./interaction/controller');

/**
 * Main router function to handle movies-api routes
 * @param {object} api - lambda-api
 * @returns void
 */
const router = (api) => {
  api.use(authMiddleware.verifyToken);

  api.get('/trending', trendingController.list);

  api.get('/list', discoverController.list);
  api.get('/:movie_id', discoverController.details);

  api.post('/user/favourite', interactionController.addToFavourite);
  api.delete('/user/favourite/:movie_id', interactionController.removeFromFavourite);
  api.get('/user/favourite/list', interactionController.listFavourites);

  api.post('/user/watch-later', interactionController.addToWatchLater);
  api.delete('/user/watch-later/:movie_id', interactionController.removeFromWatchLater);
  api.get('/user/watch-later/list', interactionController.listWatchLater);
};

module.exports = router;
