import { Connection } from 'typeorm';
import * as faker from 'faker';

import db from '../../test-utils/db';
import { post } from '../../test-utils/callApi';

let conn: Connection;

beforeAll(async () => {
  conn = await db();
});
afterAll(async () => {
  await conn.close();
});

describe('Create', () => {
  it('try create report unauthorized', async () => {
    const report = {
      title: 'title',
      text: 'text'
    };

    const { status } = await post('/reports/create', report);

    expect(status).toBe(401);
  });

  it('try create report authorized', async () => {
    const createUser = {
      username: faker.internet.userName(),
      email: 'report@test.com',
      password: 'testtest11',
      date: '2019-09-29'
    };

    const loginUser = {
      email: 'report@test.com',
      password: 'testtest11'
    };

    await post('users/signup', createUser);

    const user = await post('users/login', loginUser);

    const {
      body: { token }
    } = user;

    const report = {
      title: faker.name.title(),
      text: faker.lorem.text()
    };

    const response = await post('/reports/create', report, token);

    expect(response).toMatchObject({
      body: {
        report: {
          title: report.title,
          text: report.text
        },
        status: 200
      }
    });
  });
});
