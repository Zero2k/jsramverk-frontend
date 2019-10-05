import { Connection } from 'typeorm';
import * as faker from 'faker';

import db from '../../test-utils/db';
import { User } from '../../entity/User';
import { post } from '../../test-utils/callApi';

let conn: Connection;

beforeAll(async () => {
  conn = await db();
});
afterAll(async () => {
  await conn.close();
});

describe('Register', () => {
  it('create new user', async () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      date: '2019-09-29'
    };

    const response = await post('users/signup', user);

    expect(response).toMatchObject({
      body: {
        status: 200
      }
    });

    const newUser = await User.findOne({ where: { email: user.email } });

    expect(newUser).toBeDefined();
    expect(newUser!.username).toBe(user.username);
    expect(newUser!.email).toBe(user.email);
  });
});
