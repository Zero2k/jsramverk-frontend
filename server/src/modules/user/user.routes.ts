import { Router } from 'express';

import User from './user.controller';

const routes = new Router();

routes.post('/signup', User.signUp);
routes.post('/login', User.signIn);
routes.get('/me');

export default routes;
