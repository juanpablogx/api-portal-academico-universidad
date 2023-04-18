const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  database: 'portal-academico-universidad',
  host: 'localhost',
  port: 5432
});

module.exports = pool;