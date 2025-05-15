// lib/db.js
import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3307,
    database: 'goodmeal'
  }
});

export default db;
