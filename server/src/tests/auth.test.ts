import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Connection } from 'typeorm';
import 'mocha';
import * as faker from 'faker';

import app from './../app';
import db from '../test-utils/db';

chai.use(chaiHttp);

let connection: Connection;

describe('Auth', () => {
  beforeAll(async () => {
    connection = await db(true);
  });
  afterAll(async () => {
    if (connection && connection.isConnected) return connection.close();
  });

  describe('POST user', () => {
    it('register user', async () => {
      const user = {
        username: faker.internet.userName(),
        email: 'test@test.com',
        password: 'testtest11',
        date: '2019-09-29'
      };

      try {
        const res = await chai
          .request(app)
          .post('/api/v1/users/signup')
          .send(user);

        chai.expect(res.body.status).to.equal(200);
        chai.expect(res.body.token).to.be.a('string');
      } catch (error) {
        console.log(error);
      }
    });
  });
});
