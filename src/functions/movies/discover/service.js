const apiHelper = require('../../../utils/apiHelper');
const {
  getGenreList, setUserInteractions, transformGenre, transformMovieSummary
} = require('../../shared/movies');

/**
 * Service function to discover movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.list = async (params) => {
  const { auth, ...queryParams } = params;

  const genresPromise = getGenreList();
  let moviesPromise;
  if (queryParams.query) {
    moviesPromise = apiHelper.makeTMDBRequest({ section: 'search/movie', queryParams });
  } else {
    moviesPromise = apiHelper.makeTMDBRequest({ section: 'discover/movie', queryParams });
  }
  const [genreData, data] = await Promise.all([genresPromise, moviesPromise]);

  const discoverMovies = data.results
    .map((movie) => {
      const { genre_ids: ids, ...summary } = transformMovieSummary(movie);
      const genre = transformGenre(genreData, ids);

      return {
        ...summary,
        genre
      };
    });

  const interactionPromises = discoverMovies.map((movie) => setUserInteractions(auth.user, movie));
  const formattedMovies = await Promise.all(interactionPromises);

  return {
    data: formattedMovies,
    meta: {
      page: data.page,
      total_pages: data.total_pages
    }
  };
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

/**
 * Service function to get movie details
 * @param req
 * @param res
 * @returns Promise
 */
exports.listGenres = async () => {
  const data = await apiHelper.makeTMDBRequest({ section: 'genre/movie/list' });
  return data.genres;
};
