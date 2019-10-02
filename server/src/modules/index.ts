import { Router } from 'express';
import userRoutes from './user/user.routes';
import reportRoutes from './report/report.routes';

/* export default (app: any) => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/reports', reportRoutes);
}; */

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/reports', reportRoutes);

export default routes;
