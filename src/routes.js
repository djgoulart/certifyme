import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CoordinatorController from './app/controllers/CoordinatorController';
import MonitorController from './app/controllers/MonitorController';
import CourseController from './app/controllers/CourseController';

import authMiddleware from './app/middlewares/auth';
import adminOrCoordinatorMiddleware from './app/middlewares/adminOrCoordinator';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

// As rotas abaixo requerem autenticação
routes.use(authMiddleware);

routes.put('/users', UserController.update);

// As rotas abaixo requerem que o usuário seja Admin ou Coordenador
routes.use(adminOrCoordinatorMiddleware);

routes.post('/coordinators', CoordinatorController.store);

routes.post('/monitors', MonitorController.store);

routes.get('/courses', CourseController.index);
routes.post('/courses', CourseController.store);

export default routes;
