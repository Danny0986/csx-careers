import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';

import { pool } from './db.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    message: 'Backend funcionando',
  });
});

app.get('/api/db-health', async (_request, response) => {
  try {
    const result = await pool.query('SELECT NOW() AS "currentTime"');

    response.json({
      status: 'ok',
      message: 'Conexión a PostgreSQL exitosa',
      databaseTime: result.rows[0]?.currentTime,
    });
  } catch (error) {
    console.error('No se pudo conectar a PostgreSQL:', error);

    response.status(503).json({
      status: 'error',
      message: 'No se pudo conectar a PostgreSQL',
    });
  }
});
app.use('/api', (_request, response) => {
  response.status(404).json({
    status: 'error',
    message: 'Endpoint no encontrado',
  });
});

if (process.env.NODE_ENV === 'production') {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  const clientDistPath = path.resolve(
    currentDirectory,
    '../../client/dist',
  );

  app.use(express.static(clientDistPath));

  app.use((_request, response) => {
    response.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});