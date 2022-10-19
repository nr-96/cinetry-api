const authService = require('../auth/service');

/**
 * Middleware to verify JWT
 */
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers?.Authorization || req.headers?.authorization;
    if (!token) {
      throw Error('Unauthorized');
    }

    const user = authService.verify(token);
    req.user = user;
    next();
  } catch (error) {
    res.error(401, { message: 'Unauthorized' });
  }
};

exports.cors = (_, res, next) => {
  // Add default CORS headers for every request
  res.cors({
    methods: 'GET, PATCH, POST, PUT, DELETE, OPTIONS',
    headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Transaction-ID'
  });

  res.header('Access-Control-Allow-Origin', 'http://cinetry-client.localhost.localstack.cloud:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'Authorization');

  next();
};
