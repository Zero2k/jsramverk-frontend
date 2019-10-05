import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';

import db from './utils/db';
import app from './app';

const createServer = async () => {
  await db();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.use('*', express.static(path.join(__dirname, '../client/build')));
  }

  const PORT = <string>process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
};

createServer();
