exports.up = knex => knex.schema.createTable("movies", table => {
  table.increments("id").primary();
  table.text("title").notNullable();
  table.text("description").notNullable();
  table.integer("rating").checkBetween([0, 5]);
  table.integer("user_id").notNullable().references("id").inTable("users");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("movies");
