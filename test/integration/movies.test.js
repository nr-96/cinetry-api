const authEntry = require('../../src/entry/auth');
const movieEntry = require('../../src/entry/movies');
const eventAdapter = require('../adapter/event');

describe('integration > movies > TMDB-API', () => {
  let token;

  beforeAll(async () => {
    const { event, context } = eventAdapter.getLambdaURLEvent({
      method: 'POST',
      service: 'auth',
      path: 'login'
    });

    const result = await authEntry(event, context);
    token = JSON.parse(result.body)?.data;
  });

  it('should fetch trending movies via TMDB API', async () => {
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'GET',
        service: 'movies',
        path: 'trending',
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('meta');
      expect(body.meta).toHaveProperty('page');

      expect(Array.isArray(body.data)).toBeTruthy();
      expect(body.meta.page).toBe(1);
    }
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'GET',
        service: 'movies',
        path: 'trending',
        queryString: 'page=2',
        queryParams: { page: '2' },
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('meta');
      expect(body.meta).toHaveProperty('page');

      expect(Array.isArray(body.data)).toBeTruthy();
      expect(body.meta.page).toBe(2);
    }
  });

  it('should discover movies via TMDB API', async () => {
    const { event, context } = eventAdapter.getLambdaURLEvent({
      method: 'GET',
      service: 'movies',
      path: 'list',
      queryString: 'page=2&year=2012&with_genres=12&sort_by=popularity.asc',
      // Params to be accepted
      queryParams: {
        page: '2', year: '2012', with_genres: '12', sort_by: 'popularity.asc'
      },
      authorization: token
    });

    const result = await movieEntry(event, context);
    expect(result.statusCode).toBe(200);
    expect(result).toHaveProperty('body');
    expect(typeof result.body).toBe('string');

    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('data');
    expect(body).toHaveProperty('meta');
    expect(body.meta).toHaveProperty('page');

    expect(Array.isArray(body.data)).toBeTruthy();
    // ToDo: validate values of deep level
  });

  it('should fetch details of a movie via TMDB API', async () => {
    const { event, context } = eventAdapter.getLambdaURLEvent({
      method: 'GET',
      service: 'movies',
      path: '505642',
      queryString: '',
      queryParams: {},
      authorization: token
    });

    const result = await movieEntry(event, context);
    expect(result.statusCode).toBe(200);
    expect(result).toHaveProperty('body');
    expect(typeof result.body).toBe('string');

    const body = JSON.parse(result.body);
    expect(body).toHaveProperty('data');
    expect(body.data.id).toBe(505642);
  });
});

describe('integration > movies > interaction:favourites', () => {
  let token;
  const movieId = 616820;

  beforeAll(async () => {
    const { event, context } = eventAdapter.getLambdaURLEvent({
      method: 'POST',
      service: 'auth',
      path: 'login'
    });

    const result = await authEntry(event, context);
    token = JSON.parse(result.body)?.data;
  });

  it('should add a movie as user-favourite', async () => {
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'POST',
        service: 'movies',
        path: 'user/favourite',
        body: { movie_id: movieId },
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body.data.message).toBe('Movie is marked as favourite');
    }

    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'POST',
        service: 'movies',
        path: 'user/favourite',
        body: { movie_id: movieId },
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(400);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('error');
      expect(body.error.message).toBe('The movie is already in favourites list');
    }
  });

  it('should unlist a movie from user-favourite', async () => {
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'DELETE',
        service: 'movies',
        path: `user/favourite/${movieId}`,
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body.data.message).toBe('Movie is unlisted from favourite');
    }

    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'DELETE',
        service: 'movies',
        path: `user/favourite/${movieId}`,
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(400);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('error');
      expect(body.error.message).toBe('The movie is not listed in favourites');
    }
  });

  it('should list user-favourite movies', async () => {
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'GET',
        service: 'movies',
        path: 'user/favourite/list',
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('meta');
    }

    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'GET',
        service: 'movies',
        path: 'user/favourite/list',
        queryString: 'details=true',
        queryParams: { details: 'true' },
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('meta');
    }
  });
});

describe('integration > movies > interaction:watch-later', () => {
  let token;
  const movieId = 616820;

  beforeAll(async () => {
    const { event, context } = eventAdapter.getLambdaURLEvent({
      method: 'POST',
      service: 'auth',
      path: 'login'
    });

    const result = await authEntry(event, context);
    token = JSON.parse(result.body)?.data;
  });

  it('should add a movie as user-favourite', async () => {
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'POST',
        service: 'movies',
        path: 'user/watch-later',
        body: { movie_id: movieId },
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body.data.message).toBe('Movie is marked as watch-later');
    }

    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'POST',
        service: 'movies',
        path: 'user/watch-later',
        body: { movie_id: movieId },
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(400);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('error');
      expect(body.error.message).toBe('The movie is already in watch-later list');
    }
  });

  it('should unlist a movie from user-favourite', async () => {
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'DELETE',
        service: 'movies',
        path: `user/watch-later/${movieId}`,
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body.data.message).toBe('Movie is unlisted from watch-later');
    }

    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'DELETE',
        service: 'movies',
        path: `user/watch-later/${movieId}`,
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(400);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('error');
      expect(body.error.message).toBe('The movie is not listed in watch-later');
    }
  });

  it('should list user-favourite movies', async () => {
    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'GET',
        service: 'movies',
        path: 'user/watch-later/list',
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('meta');
    }

    {
      const { event, context } = eventAdapter.getLambdaURLEvent({
        method: 'GET',
        service: 'movies',
        path: 'user/watch-later/list',
        queryString: 'details=true',
        queryParams: { details: 'true' },
        authorization: token
      });

      const result = await movieEntry(event, context);
      expect(result.statusCode).toBe(200);
      expect(result).toHaveProperty('body');
      expect(typeof result.body).toBe('string');

      const body = JSON.parse(result.body);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('meta');
    }
  });
});
