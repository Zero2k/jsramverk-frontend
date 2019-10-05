import { Connection } from 'typeorm';

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
});
