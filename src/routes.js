import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CoordinatorController from './app/controllers/CoordinatorController';
import MonitorController from './app/controllers/MonitorController';
import CourseController from './app/controllers/CourseController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import adminOrCoordinatorMiddleware from './app/middlewares/adminOrCoordinator';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

// As rotas abaixo requerem autenticação
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);

routes.get('/courses', CourseController.index);

routes.use(adminOrCoordinatorMiddleware);

routes.post('/coordinators', CoordinatorController.store);
routes.post('/monitors', MonitorController.store);
routes.post('/courses', CourseController.store);

export default routes;
