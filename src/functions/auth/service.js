// const apiHelper = require('../../../utils/apiHelper');
const jwt = require('jsonwebtoken');
const knex = require('../../../knex');
const ApplicationError = require('../../utils/errorHelper');

const { JWT_SECRET: jwtSecretkey } = process.env;

/**
 * Service function to auth
 * @param req
 * @param res
 * @returns Promise
 */
exports.login = async () => {
  const authUser = await knex
    .from('user')
    .select(['id', 'first_name', 'last_name'])
    .where({ email: 'john.d@example.com' });

  if (!authUser?.length) {
    throw new ApplicationError({ statusCode: 401, message: 'Invalid auth attempt' });
  }

  const [user] = authUser;
  const token = jwt.sign({
    id: user.id
  }, jwtSecretkey, { expiresIn: '15000s' });

  return token;
};

/**
 * Service function to verify auth token
 * @param token
 */
exports.verify = (token) => {
  try {
    const data = jwt.verify(token, jwtSecretkey);
    if (!data) {
      throw Error('Unauthorized');
    }

    return data.id;
  } catch (error) {
    throw Error('Unauthorized');
  }
};
