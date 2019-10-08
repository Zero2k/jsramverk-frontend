import { Connection } from 'typeorm';
import * as faker from 'faker';

import db from '../test-utils/db';
import { post, put, get } from '../test-utils/callApi';

let conn: Connection;

beforeAll(async () => {
  conn = await db();
});
afterAll(async () => {
  await conn.close();
});

describe('Test reports', () => {
  it('try create report unauthorized', async () => {
    const report = {
      title: 'title',
      text: 'text'
    };

    const { status } = await post('/reports/create', report);

    expect(status).toBe(401);
  });

  it('try return list of reports', async () => {
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

    const response = await get('/reports/list', token);

    expect(response).toMatchObject({
      body: {
        status: 400,
        error: {
          msg: 'No reports exists'
        }
      }
    });
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

  it('update report', async () => {
    const loginUser = {
      email: 'report@test.com',
      password: 'testtest11'
    };

    const user = await post('users/login', loginUser);

    const {
      body: { token }
    } = user;

    /* create new report */
    const newReport = {
      title: faker.name.title(),
      text: faker.lorem.text()
    };

    const {
      body: { report }
    } = await post('/reports/create', newReport, token);

    /* update report */
    if (report) {
      const updateReport = {
        id: report.id,
        title: `Updated ${faker.name.title()}`,
        text: faker.lorem.text()
      };

      const response = await put('/reports/update', updateReport, token);

      expect(response).toMatchObject({
        body: {
          report: {
            title: updateReport.title,
            text: updateReport.text
          },
          status: 200
        }
      });
    }
  });

  it('update report with wrong ID', async () => {
    const loginUser = {
      email: 'report@test.com',
      password: 'testtest11'
    };

    const user = await post('users/login', loginUser);

    const {
      body: { token }
    } = user;

    /* create new report */
    const newReport = {
      title: faker.name.title(),
      text: faker.lorem.text()
    };

    const {
      body: { report }
    } = await post('/reports/create', newReport, token);

    /* update report */
    if (report) {
      const updateReport = {
        id: 1,
        title: faker.name.title(),
        text: faker.lorem.text()
      };

      const response = await put('/reports/update', updateReport, token);

      expect(response).toMatchObject({
        body: {
          status: 400,
          error: {
            msg: 'No report with that ID'
          }
        }
      });
    }
  });

  it('return list of reports', async () => {
    const loginUser = {
      email: 'report@test.com',
      password: 'testtest11'
    };

    const user = await post('users/login', loginUser);

    const {
      body: { token }
    } = user;

    const response = await get('/reports/list', token);

    expect(response).toMatchObject({
      body: {
        status: 200,
        reports: expect.any(Array)
      }
    });
  });
});
