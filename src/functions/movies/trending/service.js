const apiHelper = require('../../../utils/apiHelper');

/**
 * Service function to handle get trending movies list
 * @param req
 * @param res
 * @returns Promise
 */
exports.list = async (queryParams) => {
  const trendingMovies = await apiHelper.makeTMDBRequest({ section: 'trending/movie/week', queryParams });
  return trendingMovies;
};
