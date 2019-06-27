// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user:  process.env.DB_USER,
      password: process.env.DB_PASS,
      database : process.env.DB_DATA,
      charset :'utf8'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user: "user",
      password: "root",
      database : "todos",
      charset :'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user: "user",
      password: "root",
      database : "todos",
      charset :'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
