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
