const tableKey = 'user_movie_watch_later';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => knex.schema.createTable(tableKey, (table) => {
  table.increments('id').primary().unsigned();
  table.integer('user').notNullable().references('id').inTable('user');
  table.string('movie').unique().notNullable();
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable(tableKey);
