"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

// eslint-disable-next-line consistent-return
exports. default = async (req, res, next) => {
  const isAdminOrCoordinator = await _User2.default.findOne({
    where: {
      id: req.userId,
      [_sequelize.Op.or]: [{ admin: true }, { coordinator: true }],
    },
  });

  if (!isAdminOrCoordinator) {
    return res.status(401).json({
      error: 'You are not authorized to perform this action.',
    });
  }

  next();
};
