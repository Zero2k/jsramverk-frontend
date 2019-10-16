import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { Connection } from 'typeorm';

import db from '../test-utils/db';

chai.use(chaiHttp);

let connection: Connection;

describe('Connection', () => {
  beforeAll(async () => {
    connection = await db(true);
  });
  afterAll(async () => {
    if (connection && connection.isConnected) return connection.close();
  });

  describe('connect to database', () => {
    it('connection.isConnected should be true', () => {
      if (!connection) return;

      chai.expect(connection.isConnected).to.be.true;
    });
  });
});
