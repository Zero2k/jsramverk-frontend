import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import routes from './modules';

import db from './utils/db';

const createServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_HOST
    })
  );

  await db();

  app.use('/api/v1', routes);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.use('*', express.static(path.join(__dirname, '../../client/build')));
  }

  const PORT = <string>process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
};

createServer();
