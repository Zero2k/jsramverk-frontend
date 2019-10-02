import { Router } from 'express';

import User from './user.controller';
import { userAuth } from './user';

const routes = Router();

routes.post('/signup', User.signUp);
routes.post('/login', User.signIn);
routes.get('/me', userAuth, User.me);

export default routes;
