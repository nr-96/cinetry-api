const authController = require('./controller');

/**
 * Main router function to handle users-api routes
 * @param {object} api - lambda-api
 * @returns void
 */
const router = (api) => {
  api.post('/login', authController.login);
};

module.exports = router;
