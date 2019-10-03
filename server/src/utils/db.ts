import { getConnectionOptions, createConnection } from 'typeorm';

export const db = async (retry = 10) => {
  while (retry) {
    try {
      const connectionOptions = await getConnectionOptions();
      process.env.NODE_ENV === 'production'
        ? await createConnection({
            ...connectionOptions,
            url: process.env.DATABASE_URL
          } as any)
        : await createConnection({ ...connectionOptions });
      break;
    } catch (err) {
      console.log(err);
      retry -= 1;
      await new Promise(res => setTimeout(res, 10000));
    }
  }
};

export default db;
