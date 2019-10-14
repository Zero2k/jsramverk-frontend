import { Connection } from 'typeorm';
import { User } from '../entity/User';
import { Report } from '../entity/Report';

import db from '../test-utils/db';

let connection: Connection;

beforeAll(async () => {
  try {
    connection = await db(true);
  } catch (error) {
    console.log('Error', error);
  }
});
afterAll(async () => {
  if (connection && connection.isConnected) return connection.close();
});

describe('Connection', () => {
  it('connection.isConnected should be true', () => {
    if (!connection) return;

    expect(connection.isConnected).toBe(true);
  });

  it('check if User entity exists', async () => {
    const user = {
      username: 'test',
      email: 'test@test.com',
      password: 'testtest11',
      birthday: '2019-09-29'
    };

    await User.create(user).save();

    const newUser = await User.findOne({ where: { email: user.email } });

    expect(newUser).toBeDefined();
  });

  it('check if Report entity exists', async () => {
    const report = {
      title: 'title',
      text: 'text'
    };

    await Report.create(report).save();

    const newReport = await Report.findOne({ where: { title: report.title } });

    expect(newReport).toBeDefined();
  });
});
