const apiHelper = require('../../../utils/apiHelper');

/**
 * Service function to discover movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.list = async (queryParams) => {
  let movieResult = [];

  if (queryParams.query) {
    movieResult = await apiHelper.makeTMDBRequest({ section: 'search/movie', queryParams });
  } else {
    movieResult = await apiHelper.makeTMDBRequest({ section: 'discover/movie', queryParams });
  }

  return movieResult;
};

/**
 * Service function to get movie details
 * @param req
 * @param res
 * @returns Promise
 */
exports.details = async ({ movie_id: movieId }) => {
  const movieDetails = await apiHelper.makeTMDBRequest({ section: `movie/${movieId}` });
  return movieDetails;
};
