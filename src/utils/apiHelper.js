const fetch = require('node-fetch');

const httpRequest = async (options = {}) => {
  const baseOptions = {
    method: options.method,
    headers: options.headers
  };

  this.uri = options.uri;
  const requestOptions = options.method === 'GET' || options.method === 'DELETE' ? baseOptions : { ...baseOptions, body: options.body };
  const request = await fetch(options.uri, requestOptions);

  return request.json();
};

module.exports = {
  httpRequest
};
