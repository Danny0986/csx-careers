import 'dotenv/config';

import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'true'
      ? { rejectUnauthorized: false }
      : false,
});

pool.on('error', (error) => {
  console.error('Error inesperado en PostgreSQL:', error);
});