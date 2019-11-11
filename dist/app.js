"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});require('dotenv/config');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
require('express-async-errors');
var _youch = require('youch'); var _youch2 = _interopRequireDefault(_youch);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(_cors2.default.call(void 0, ));
    this.server.use(_express2.default.json());
    this.server.use(
      '/files',
      _express2.default.static(_path2.default.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(_routes2.default);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new (0, _youch2.default)(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

exports. default = new App().server;
