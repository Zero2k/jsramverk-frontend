import userRoutes from './user/user.routes';
import reportRoutes from './report/report.routes';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/reports', reportRoutes);
};
