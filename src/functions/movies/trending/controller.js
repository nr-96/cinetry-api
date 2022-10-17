const superController = require('../../controller');
const validator = require('./validator');
const service = require('./service');

/**
 * Controller function to handle get trending movies
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
