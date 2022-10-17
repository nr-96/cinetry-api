const apiHelper = require('../../../utils/apiHelper');

/**
 * Service function to handle get trending movies list
 * @param req
 * @param res
 * @returns Promise
 */
exports.getList = async () => {
  const trendingMovies = await apiHelper.makeTMDBRequest({ section: 'trending/movie/week', queryParams: { page: 2, maximum: 50 } });
  return trendingMovies;
};
