const superController = require('../../controller');
const validator = require('./validator');
const service = require('./service');

/**
 * Controller function to discover movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.list = async (req, res) => {
  await superController(req, res, {
    validator: validator.list,
    service: service.list
  });
};

/**
 * Controller function to get movie details
 * @param req
 * @param res
 * @returns Promise
 */
exports.details = async (req, res) => {
  await superController(req, res, {
    validator: validator.details,
    service: service.details
  });
};

/**
 * Controller function to get genres
 * @param req
 * @param res
 * @returns Promise
 */
exports.listGenres = async (req, res) => {
  await superController(req, res, {
    service: service.listGenres
  });
};
