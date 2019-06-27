
exports.up = function(knex) {
    return knex.schema.createTable('todos', function (table) {
        table.increments('id');
        table.string('name');
        table.boolean('done');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('todos')
};
