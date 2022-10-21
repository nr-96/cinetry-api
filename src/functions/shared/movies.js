const knex = require('../../../knex');
const apiHelper = require('../../utils/apiHelper');

/**
 * Shared function to fetch genres
 */
exports.getGenreList = async () => {
  const transformGenreName = (name) => {
    if (name === 'Science Fiction') {
      return 'Sci-Fi';
    }

    return name;
  };

  const data = await apiHelper.makeTMDBRequest({ section: '/genre/movie/list' });

  const result = {};
  data.genres.forEach(({ id, name }) => {
    result[id] = transformGenreName(name);
  });

  return result;
};

/**
 * Shared function to map user interactions for a movie
 */
exports.setUserInteractions = async (user, movie) => {
  const movieId = movie.id;
  let watchLater = false;
  let favourite = false;

  try {
    const watchLaterPromise = knex
      .from('user_movie_watch_later')
      .select(['id'])
      .where({ user, movie: movieId })
      .first();

    const favouritePromise = knex
      .from('user_movie_favourite')
      .select(['id'])
      .where({ user, movie: movieId })
      .first();

    [watchLater, favourite] = await Promise.all([watchLaterPromise, favouritePromise]);
  // eslint-disable-next-line no-empty
  } catch (e) {}

  // eslint-disable-next-line no-param-reassign
  movie.watch_later = !!watchLater;
  // eslint-disable-next-line no-param-reassign
  movie.favourite = !!favourite;

  return movie;
};

exports.transformGenre = (data, movieGenres) => {
  const genres = movieGenres.map((id) => ({ id, name: data[id] }));
  return genres;
};

/**
 * Shared function to transform movie summary
 * @param movie - TMDB movie data
 * @returns cinetry movie summary data
 */
exports.transformMovieSummary = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster: movie.poster_path,
  year: movie.release_date?.slice(0, 4),
  genre_ids: movie.genre_ids
});
