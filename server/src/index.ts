import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as path from 'path';
import { createServer } from 'http';

import db from './utils/db';
import app from './app';
import socket from './utils/socket';

const startServer = async () => {
  await db();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.use('*', express.static(path.join(__dirname, '../client/build')));
  }

  const server = createServer(app);
  socket(server);

  const PORT = <string>process.env.PORT || 4000;

  server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
};

startServer();
