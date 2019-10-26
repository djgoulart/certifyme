import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CoordinatorController from './app/controllers/CoordinatorController';
import MonitorController from './app/controllers/MonitorController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/coordinators', CoordinatorController.store);

routes.post('/monitors', MonitorController.store);

export default routes;
