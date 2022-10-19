const apiHelper = require('../../../utils/apiHelper');
const { getGenreList, transformGenre, transformMovieSummary } = require('../../shared/movies');

/**
 * Service function to handle get trending movies list
 * @param req
 * @param res
 * @returns Promise
 */
exports.list = async (queryParams) => {
  const genresPromise = getGenreList();
  const moviesPromise = apiHelper.makeTMDBRequest({ section: 'trending/movie/week', queryParams });
  const [genreData, data] = await Promise.all([genresPromise, moviesPromise]);

  const trendingMovies = data.results
    .map((movie) => {
      const { genre_ids: ids, ...summary } = transformMovieSummary(movie);
      const genre = transformGenre(genreData, ids);

      return {
        ...summary,
        genre
      };
    });

  return {
    data: trendingMovies,
    meta: {
      page: data.page,
      total_pages: data.total_pages
    }
  };
};
