const knex = require('../../../../knex');
const ApplicationError = require('../../../utils/errorHelper');
const discoverService = require('../discover/service');

/**
 * Service function to add movie as user favourite
 * @param req
 * @param res
 * @returns Promise
 */
exports.addToFavourite = async (params) => {
  const { user, movie_id: movieId } = params;

  const isFavourite = await knex
    .from('user_movie_favourite')
    .select(['id'])
    .first()
    .where({ user, movie: movieId });

  if (isFavourite) {
    throw new ApplicationError({
      statusCode: 400,
      message: 'The movie is already in favourites list'
    });
  }

  await knex
    .from('user_movie_favourite')
    .insert({ user, movie: movieId });

  return { message: 'Movie is marked as favourite' };
};

/**
 * Service function to remove movie from user favourite
 * @param req
 * @param res
 * @returns Promise
 */
exports.removeFromFavourite = async (params) => {
  const { user, movie_id: movieId } = params;

  const isFavourite = await knex
    .from('user_movie_favourite')
    .select(['id'])
    .first()
    .where({ user, movie: movieId });

  if (!isFavourite) {
    throw new ApplicationError({
      statusCode: 400,
      message: 'The movie is not listed in favourites'
    });
  }

  await knex
    .from('user_movie_favourite')
    .where({ user, movie: movieId })
    .del();

  return { message: 'Movie is unlisted from favourite' };
};

/**
 * Service function list favourite movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.listFavourites = async (params) => {
  const { user, details = false, page = 1 } = params;
  const offset = page - 1;

  const [{ count }] = await knex
    .from('user_movie_favourite')
    .count('id')
    .where({ user });

  const favouriteMovies = await knex
    .from('user_movie_favourite')
    .select(['id', 'movie'])
    .where({ user })
    .offset(offset)
    .limit(20);

  if (details) {
    const movieDetailsPromises = favouriteMovies.map(({ movie }) => discoverService.details({ movie_id: movie }));
    const movieDetails = await Promise.all(movieDetailsPromises);

    movieDetails.forEach((data) => {
      if (!data) return;

      const movieId = data.id;
      const originalMovieIndex = favouriteMovies.findIndex(({ movie }) => Number(movie) === movieId);
      favouriteMovies[originalMovieIndex] = data;
    });
  }

  return {
    data: favouriteMovies,
    meta: {
      page,
      total_pages: Math.ceil((count || 0) / 20)
    }
  };
};

/**
 * Service function to add movie as watch later
 * @param req
 * @param res
 * @returns Promise
 */
exports.addToWatchLater = async (params) => {
  const { user, movie_id: movieId } = params;

  const isInWatchLater = await knex
    .from('user_movie_watch_later')
    .select(['id'])
    .first()
    .where({ user, movie: movieId });

  if (isInWatchLater) {
    throw new ApplicationError({
      statusCode: 400,
      message: 'The movie is already in watch-later list'
    });
  }

  await knex
    .from('user_movie_watch_later')
    .insert({ user, movie: movieId });

  return { message: 'Movie is marked as watch-later' };
};

/**
 * Service function to remove movie from watch-later
 * @param req
 * @param res
 * @returns Promise
 */
exports.removeFromWatchLater = async (params) => {
  const { user, movie_id: movieId } = params;

  const isInWatchLater = await knex
    .from('user_movie_watch_later')
    .select(['id'])
    .first()
    .where({ user, movie: movieId });

  if (!isInWatchLater) {
    throw new ApplicationError({
      statusCode: 400,
      message: 'The movie is not listed in watch-later'
    });
  }

  await knex
    .from('user_movie_watch_later')
    .where({ user, movie: movieId })
    .del();

  return { message: 'Movie is unlisted from watch-later' };
};

/**
 * Service function list watch-later movies
 * @param req
 * @param res
 * @returns Promise
 */
exports.listWatchLater = async (params) => {
  const { user, details = false, page = 1 } = params;
  const offset = page - 1;

  const [{ count }] = await knex
    .from('user_movie_watch_later')
    .count('id')
    .where({ user });

  const watchLaterMovies = await knex
    .from('user_movie_watch_later')
    .select(['id', 'movie'])
    .where({ user })
    .offset(offset)
    .limit(20);

  if (details) {
    const movieDetailsPromises = watchLaterMovies.map(({ movie }) => discoverService.details({ movie_id: movie }));
    const movieDetails = await Promise.all(movieDetailsPromises);

    movieDetails.forEach((data) => {
      if (!data) return;

      const movieId = data.id;
      const originalMovieIndex = watchLaterMovies.findIndex(({ movie }) => Number(movie) === movieId);
      watchLaterMovies[originalMovieIndex] = data;
    });
  }

  return {
    data: watchLaterMovies,
    meta: {
      page,
      total_pages: Math.ceil((count || 0) / 20)
    }
  };
};
