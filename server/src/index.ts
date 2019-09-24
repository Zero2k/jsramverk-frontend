import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import db from './utils/db';

import apiRoutes from './modules';

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

  apiRoutes(app);

  app.get('*', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the default route'
    })
  );

  await db();

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, err => {
    if (err) {
      console.log(err);
    }

    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
};

createServer();
