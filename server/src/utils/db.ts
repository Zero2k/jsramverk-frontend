import { getConnectionOptions, createConnection } from 'typeorm';
import { User } from '../entity/User';
import { Report } from '../entity/Report';

const db = async () => {
  try {
    const connectionOptions = await getConnectionOptions();
    await createConnection({
      ...connectionOptions,
      entities: [User, Report],
      name: 'default'
    });
  } catch (err) {
    console.log(err);
  }
};

export default db;
