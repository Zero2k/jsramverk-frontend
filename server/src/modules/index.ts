import { Router } from 'express';
import userRoutes from './user/user.routes';
import reportRoutes from './report/report.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/reports', reportRoutes);

export default routes;
