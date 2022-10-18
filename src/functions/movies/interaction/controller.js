const superController = require('../../controller');
const validator = require('./validator');
const service = require('./service');

/**
 * Controller function to add movie as user favourite
 * @param req
 * @param res
 * @returns Promise
 */
exports.addToFavourite = async (req, res) => {
  await superController(req, res, {
    validator: validator.addToFavourite,
    service: service.addToFavourite
  });
};

/**
 * Controller function - to remove movie from user favourite
 * @param req
 * @param res
 * @returns Promise
 */
exports.removeFromFavourite = async (req, res) => {
  await superController(req, res, {
    validator: validator.removeFromFavourite,
    service: service.removeFromFavourite
  });
};

/**
 * Controller function - list user favourite movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.listFavourites = async (req, res) => {
  await superController(req, res, {
    validator: validator.listFavourites,
    service: service.listFavourites
  });
};

/**
 * Controller function to add movie as watch-later
 * @param req
 * @param res
 * @returns Promise
 */
exports.addToWatchLater = async (req, res) => {
  await superController(req, res, {
    validator: validator.addToWatchLater,
    service: service.addToWatchLater
  });
};

/**
 * Controller function - to remove movie from watch-later
 * @param req
 * @param res
 * @returns Promise
 */
exports.removeFromWatchLater = async (req, res) => {
  await superController(req, res, {
    validator: validator.removeFromWatchLater,
    service: service.removeFromWatchLater
  });
};

/**
 * Controller function - list watch-later movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.listWatchLater = async (req, res) => {
  await superController(req, res, {
    validator: validator.listWatchLater,
    service: service.listWatchLater
  });
};
