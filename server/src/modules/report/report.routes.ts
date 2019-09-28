import { Router } from 'express';

import Report from './report.controller';
import { userAuth } from '../user/user';

const routes = new Router();

routes.get('/list', userAuth, Report.getReports);
routes.post('/create', userAuth, Report.createReport);
routes.put('/update', userAuth, Report.updateReport);
routes.get('/:id', userAuth, Report.singleReport);

export default routes;
