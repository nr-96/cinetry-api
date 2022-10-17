const tableKey = 'user';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableKey, (table) => {
    table.increments('id').primary().unsigned();
    table.string('email').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
  });

  await knex(tableKey).insert({
    email: 'john.d@example.com',
    first_name: 'John',
    last_name: 'Doe'
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable(tableKey);
