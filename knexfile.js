const {
  NODE_ENV, PG_HOST, PG_USER, PG_PASSWORD, PG_PORT, PG_DATABASE
} = process.env;

const connection = {
  client: 'pg',
  connection: {
    host: PG_HOST, user: PG_USER, password: PG_PASSWORD, port: PG_PORT, database: PG_DATABASE
  },
  pool: {
    min: 0,
    max: NODE_ENV === 'test' ? 1 : 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  }
};

module.exports = connection;
