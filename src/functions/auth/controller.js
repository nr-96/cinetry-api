const superController = require('../controller');
const service = require('./service');

/**
 * Controller function to auth
 * @param req
 * @param res
 * @returns Promise
 */
exports.login = async (req, res) => {
  await superController(req, res, {
    service: service.login
  });
};
