const authController = require('./auth');
const usersController = require('./users');
const moviesController = require('./movies');

exports.auth = authController;
exports.users = usersController;
exports.movies = moviesController;
