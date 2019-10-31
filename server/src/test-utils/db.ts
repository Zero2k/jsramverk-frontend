import { createConnection, getConnectionOptions } from 'typeorm';
import { User } from '../entity/User';
import { Report } from '../entity/Report';
import { Message } from '../entity/Message';

export const db = async (drop: boolean = false) => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  const database = await createConnection({
    ...connectionOptions,
    entities: [User, Report, Message],
    name: 'default',
    dropSchema: drop
  } as any);

  return database;
};

export default db;
