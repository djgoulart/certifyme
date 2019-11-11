"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _CoordinatorController = require('./app/controllers/CoordinatorController'); var _CoordinatorController2 = _interopRequireDefault(_CoordinatorController);
var _MonitorController = require('./app/controllers/MonitorController'); var _MonitorController2 = _interopRequireDefault(_MonitorController);
var _CourseController = require('./app/controllers/CourseController'); var _CourseController2 = _interopRequireDefault(_CourseController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _SubscriptionController = require('./app/controllers/SubscriptionController'); var _SubscriptionController2 = _interopRequireDefault(_SubscriptionController);
var _AvailableController = require('./app/controllers/AvailableController'); var _AvailableController2 = _interopRequireDefault(_AvailableController);
var _ReviewController = require('./app/controllers/ReviewController'); var _ReviewController2 = _interopRequireDefault(_ReviewController);
var _HourController = require('./app/controllers/HourController'); var _HourController2 = _interopRequireDefault(_HourController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _adminOrCoordinator = require('./app/middlewares/adminOrCoordinator'); var _adminOrCoordinator2 = _interopRequireDefault(_adminOrCoordinator);
var _isNotStudent = require('./app/middlewares/isNotStudent'); var _isNotStudent2 = _interopRequireDefault(_isNotStudent);

var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

const routes = new (0, _express.Router)();

const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/sessions', _SessionController2.default.store);

routes.post('/users', _UserController2.default.store);

// As rotas abaixo requerem autenticação
routes.use(_auth2.default);

routes.put('/users', _UserController2.default.update);

routes.post('/subscriptions', _SubscriptionController2.default.store);

routes.post('/files', upload.single('file'), _FileController2.default.store);
routes.get('/files', _FileController2.default.index);

routes.get('/courses', _CourseController2.default.index);

// As rotas abaixo não podem ser acessadas por alunos.
routes.use(_isNotStudent2.default);

routes.get('/availables', _AvailableController2.default.index);

routes.put('/reviews/:fileId', _ReviewController2.default.update);

routes.get('/hours/', _HourController2.default.index);

// As rotas abaixo não podem ser acessadas por alunos e monitores.
routes.use(_adminOrCoordinator2.default);

routes.get('/users', _UserController2.default.index);

routes.post('/coordinators', _CoordinatorController2.default.store);

routes.post('/monitors', _MonitorController2.default.store);

routes.post('/courses', _CourseController2.default.store);

exports. default = routes;
