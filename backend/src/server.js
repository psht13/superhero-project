import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import { pinoConfig } from './utils/config.js';

import superheroesRouter from './routers/superheroes.router.js';

import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { notFoundHandlerMiddleware } from './middlewares/not-found-handler.middleware.js';

const PORT = env('PORT', 3000);

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino(pinoConfig));

  app.use('/api/superheroes', superheroesRouter);

  app.use('*', notFoundHandlerMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is available on port ${PORT}`);
  });
};
