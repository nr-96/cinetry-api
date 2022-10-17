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
