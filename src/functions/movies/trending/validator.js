/* eslint-disable camelcase */

const Joi = require('joi');
const { clean, validate } = require('../../../utils/validationHelper');

/**
 * Joi.Validator to validate trending:list
 * @param {object} req
 */
exports.list = (req) => {
  const { page } = req.query;
  const attributes = clean({ page });

  return validate(attributes, () => Joi.object().keys({
    page: Joi.number().optional()
  }));
};
