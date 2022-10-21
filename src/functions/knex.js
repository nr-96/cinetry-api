const knex = require('../../knex');

function up() {
  return knex.migrate.latest();
}

function down() {
  return knex.migrate.down();
}

module.exports = {
  up,
  down
};
