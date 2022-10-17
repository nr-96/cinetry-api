const superController = require('../../controller');
const service = require('./service');

/**
 * Controller function to handle get trending movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.getList = async (req, res) => {
  await superController(req, res, {
    service: service.getList
  });
};
