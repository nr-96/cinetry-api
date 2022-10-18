/* eslint-disable camelcase */

const Joi = require('joi');
const { clean, validate } = require('../../../utils/validationHelper');

/**
 * Joi.Validator to validate user interaction for movies
 * - to add movie as user favourite
 * @param {object} req
 */
exports.addToFavourite = (req) => {
  const { user } = req;
  const { movie_id } = req.body;
  const attributes = clean({ user, movie_id });

  return validate(attributes, () => Joi.object().keys({
    user: Joi.number().required(),
    movie_id: Joi.number().required()
  }));
};

/**
 * Joi.Validator to validate user interaction for movies
 * - to remove movie from user favourite
 * @param {object} req
 */
exports.removeFromFavourite = (req) => {
  const { user } = req;
  const { movie_id } = req.params;
  const attributes = clean({ user, movie_id });

  return validate(attributes, () => Joi.object().keys({
    user: Joi.number().required(),
    movie_id: Joi.number().required()
  }));
};

/**
 * Joi.Validator to validate user interaction for movies
 * - to list movies marked as favourite
 * @param {object} req
 */
exports.listFavourites = (req) => {
  const { user } = req;
  const { details } = req.query;
  const attributes = clean({ user, details });

  return validate(attributes, () => Joi.object().keys({
    user: Joi.number().required(),
    details: Joi.boolean().optional(),
    page: Joi.number().min(1).optional()
  }));
};

/**
 * Joi.Validator to validate user interaction for movies
 * - to add movie as watch-later
 * @param {object} req
 */
exports.addToWatchLater = (req) => {
  const { user } = req;
  const { movie_id } = req.body;
  const attributes = clean({ user, movie_id });

  return validate(attributes, () => Joi.object().keys({
    user: Joi.number().required(),
    movie_id: Joi.number().required()
  }));
};

/**
 * Joi.Validator to validate user interaction for movies
 * - to remove movie from watch-later
 * @param {object} req
 */
exports.removeFromWatchLater = (req) => {
  const { user } = req;
  const { movie_id } = req.params;
  const attributes = clean({ user, movie_id });

  return validate(attributes, () => Joi.object().keys({
    user: Joi.number().required(),
    movie_id: Joi.number().required()
  }));
};

/**
 * Joi.Validator to validate user interaction for movies
 * - to list movies marked as watch-later
 * @param {object} req
 */
exports.listWatchLater = (req) => {
  const { user } = req;
  const { details } = req.query;
  const attributes = clean({ user, details });

  return validate(attributes, () => Joi.object().keys({
    user: Joi.number().required(),
    details: Joi.boolean().optional(),
    page: Joi.number().min(1).optional()
  }));
};
