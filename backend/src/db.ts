import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'tinyshop_user',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'tiny_webshop',
  password: process.env.DB_PASS || 'password',
  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;
