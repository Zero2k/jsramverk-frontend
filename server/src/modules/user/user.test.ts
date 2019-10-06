import { Connection } from 'typeorm';
import * as faker from 'faker';

import db from '../../test-utils/db';
import { User } from '../../entity/User';
import { post, get } from '../../test-utils/callApi';

let conn: Connection;

beforeAll(async () => {
  conn = await db(true);
});
afterAll(async () => {
  await conn.close();
});

describe('Test user / auth', () => {
  it('create new user', async () => {
    const user = {
      username: faker.internet.userName(),
      email: 'test@test.com',
      password: 'testtest11',
      date: '2019-09-29'
    };

    const response = await post('users/signup', user);
    console.log(response);

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

  it('create new user with same email', async () => {
    const user = {
      username: faker.internet.userName(),
      email: 'test@test.com',
      password: 'testtest11',
      date: '2019-09-29'
    };

    const response = await post('users/signup', user);

    expect(response).toMatchObject({
      body: {
        status: 400,
        error: {
          field: 'email',
          msg: 'User already exists'
        }
      }
    });
  });

  it('login with wrong email', async () => {
    const user = {
      email: 'test2@test.com',
      password: 'testtest12'
    };

    const response = await post('users/login', user);

    expect(response).toMatchObject({
      body: {
        status: 400,
        error: {
          field: 'email',
          msg: 'No user with that email'
        }
      }
    });
  });

  it('login with wrong password', async () => {
    const user = {
      email: 'test@test.com',
      password: 'testtest12'
    };

    const response = await post('users/login', user);

    expect(response).toMatchObject({
      body: {
        status: 400,
        error: {
          field: 'password',
          msg: 'Wrong password'
        }
      }
    });
  });

  it('login with short password', async () => {
    const user = {
      email: 'test@test.com',
      password: 'testtes'
    };

    const response = await post('users/login', user);

    expect(response).toMatchObject({
      body: {
        status: 400,
        error: {
          errors: ['Password is too short - should be 8 chars minimum.']
        }
      }
    });
  });

  it('login user', async () => {
    const user = {
      email: 'test@test.com',
      password: 'testtest11'
    };

    const response = await post('users/login', user);

    expect(response).toMatchObject({
      body: {
        status: 200
      }
    });
  });

  it('user authenticated', async () => {
    const user = {
      email: 'test@test.com',
      password: 'testtest11'
    };

    const {
      body: { token }
    } = await post('users/login', user);

    const response = await get('users/me', token);

    expect(response).toMatchObject({
      status: 200,
      body: {
        email: user.email
      }
    });
  });
});
