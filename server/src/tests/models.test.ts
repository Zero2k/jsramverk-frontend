import { Connection } from 'typeorm';
import * as faker from 'faker';

/* import { User } from '../entity/User';
import { Report } from '../entity/Report'; */
import { post, get, put } from '../test-utils/callApi';
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

describe('Test user / auth', () => {
  /* it('create new user', async () => {
    const user = {
      username: faker.internet.userName(),
      email: 'test@test.com',
      password: 'testtest11',
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
  }); */

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

describe('Test reports', () => {
  it('try create report unauthorized', async () => {
    const report = {
      title: 'title',
      text: 'text'
    };

    const { status } = await post('/reports/create', report);

    expect(status).toBe(401);
  });

  /* it('try return list of reports', async () => {
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
  }); */

  /* it('try create report authorized', async () => {
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
  }); */

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
        id: 1111,
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

  /* it('return list of reports', async () => {
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
  }); */

  /* it('return no reports', async () => {
    const loginUser = {
      email: 'report@test.com',
      password: 'testtest11'
    };

    const user = await post('users/login', loginUser);

    const {
      body: { token }
    } = user;

    const response = await get('/reports/12345', token);

    expect(response).toMatchObject({
      body: {
        status: 400,
        error: {
          msg: 'No report exists'
        }
      }
    });
  }); */

  /* it('return a single report', async () => {
    const loginUser = {
      email: 'report@test.com',
      password: 'testtest11'
    };

    const user = await post('users/login', loginUser);

    const {
      body: { token }
    } = user;

    const reports = await Report.find();
    const reportId = reports[0].id;

    const response = await get(`/reports/${reportId}`, token);

    expect(response).toMatchObject({
      body: {
        status: 200,
        report: expect.any(Object)
      }
    });
  }); */

  /* it('delete report', async () => {
    const loginUser = {
      email: 'report@test.com',
      password: 'testtest11'
    };

    const user = await post('users/login', loginUser);

    const {
      body: { token }
    } = user;

    const reports = await Report.find();
    const reportId = reports[0].id;

    const response = await del(`/reports/delete/${reportId}`, token);

    expect(response).toMatchObject({
      body: {
        status: 200
      }
    });
  }); */
});
