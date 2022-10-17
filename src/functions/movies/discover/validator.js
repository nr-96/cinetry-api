/* eslint-disable camelcase */

const Joi = require('joi');
const { clean, validate } = require('../../../utils/validationHelper');

/**
 * Joi.Validator to validate discover-movies:list
 * @param {object} req
 * @returns attributes|ApplicationError
 */
exports.list = (req) => {
  const {
    query, page, year, with_genres, sort_by
  } = req.query;
  const attributes = clean({
    query, page, year, with_genres, sort_by
  });

  return validate(attributes, () => Joi.object().keys({
    query: Joi.string().optional(),
    page: Joi.number().optional(),
    year: Joi.number().optional(),
    with_genres: Joi.string().optional(),
    sort_by: Joi.string().optional()
  }));
};

/**
 * Joi.Validator to validate discover-movies:details
 * @param {object} req
 * @returns attributes|ApplicationError
 */
exports.details = (req) => {
  const { movie_id } = req.params;
  const attributes = clean({
    movie_id
  });

  return validate(attributes, () => Joi.object().keys({
    movie_id: Joi.number().required()
  }));
};
