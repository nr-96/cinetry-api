const apiHelper = require('../../../utils/apiHelper');
const {
  getGenreList, setUserInteractions, transformGenre, transformMovieSummary
} = require('../../shared/movies');

/**
 * Service function to handle get trending movies list
 * @param req
 * @param res
 * @returns Promise
 */
exports.list = async (params) => {
  const { auth, ...queryParams } = params;

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

  const interactionPromises = trendingMovies.map((movie) => setUserInteractions(auth.user, movie));
  const formattedMovies = await Promise.all(interactionPromises);

  return {
    data: formattedMovies,
    meta: {
      page: data.page,
      total_pages: data.total_pages
    }
  };
};
