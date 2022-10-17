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
      expect(body.data).toHaveProperty('page');
      expect(body.data).toHaveProperty('results');

      expect(body.data.page).toBe(1);
      expect(Array.isArray(body.data.results)).toBeTruthy();
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
      expect(body.data).toHaveProperty('page');
      expect(body.data).toHaveProperty('results');

      expect(body.data.page).toBe(2);
      expect(Array.isArray(body.data.results)).toBeTruthy();
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
    expect(body.data).toHaveProperty('page');
    expect(body.data).toHaveProperty('results');

    expect(Array.isArray(body.data.results)).toBeTruthy();

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
