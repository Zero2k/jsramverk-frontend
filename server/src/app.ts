import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import routes from './modules';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production' ? process.env.FRONTEND_HOST : '*'
  })
);

app.use('/api/v1', routes);

export default app;
