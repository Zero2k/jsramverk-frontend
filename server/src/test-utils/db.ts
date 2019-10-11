import { createConnection, getConnectionOptions } from 'typeorm';

export const db = async (drop: boolean = false) => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  return createConnection({
    ...connectionOptions,
    name: 'default',
    dropSchema: drop
  } as any);
};

export default db;
