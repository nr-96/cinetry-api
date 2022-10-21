const fetch = require('node-fetch');

/**
 * Helper function to build query params.
 *
 * @param attributes - attributes which need to be included in the query string
 * @param options - options to build query string
 * @param [options.keepUndefined] - add undefined values to the query
 * @returns string
 */
const buildQueryParams = (attributes, options = {}) => {
  const { keepUndefined = false } = options;
  const toMap = attributes;

  return Object.entries(toMap)
    .filter((props) => (!keepUndefined && typeof props[1] !== 'undefined') || (keepUndefined))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
};

/**
 * Helper function to make http request
 * @param options - request payload
 * @param options.method - http method
 * @param options.uri - endpoint
 */
const httpRequest = async (options = {}) => {
  const baseOptions = {
    method: options.method
  };

  const requestOptions = options.method === 'GET' || options.method === 'DELETE' ? baseOptions : { ...baseOptions, body: options.body };
  const request = await fetch(options.uri, requestOptions);

  return request.json();
};

/**
 * Helper function to request TMDB API request
 * @param payload - request payload
 * @param payload.section - section to be requested [eg: trending/all/day]
 * @param payload.queryParams - query params to be binded to the request
 */
const makeTMDBRequest = ({ section, queryParams }) => {
  const { TMDB_API_KEY } = process.env;

  const query = buildQueryParams({ api_key: TMDB_API_KEY, ...queryParams });
  const endpoint = `https://api.themoviedb.org/3/${section}?${query}`;

  return httpRequest({
    method: 'GET',
    uri: endpoint
  });
};

module.exports = {
  httpRequest,
  makeTMDBRequest
};
