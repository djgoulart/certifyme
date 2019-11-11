"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Subscription = require('../models/Subscription'); var _Subscription2 = _interopRequireDefault(_Subscription);
var _Course = require('../models/Course'); var _Course2 = _interopRequireDefault(_Course);

class HourController {
  async index(req, res) {
    const student = await _User2.default.findOne({
      where: {
        id: req.userId,
      },
      attributes: ['id', 'name', 'registration'],
      include: [
        {
          model: _Subscription2.default,
          as: 'subscription',
          attributes: ['id', 'course_id', 'student_id'],
          include: [
            {
              model: _Course2.default,
              as: 'course',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    const files = await _File2.default.findAll({
      where: {
        user_id: req.userId,
        course_id: student.subscription.course_id,
        [_sequelize.Op.or]: [{ approved: true }, { approved: false }],
      },
      attributes: ['id', 'value', 'approved'],
    });

    const approved = files.filter(file => file.approved);

    const disapproved = files.filter(file => !file.approved);

    const hours = approved.map(file => {
      return file.value;
    });

    const sumHours = hours.reduce((sum, next) => sum + next);

    return res.json({
      student,
      hours: sumHours,
      approved_certs: approved.length,
      disapproved_certs: disapproved.length,
    });
  }
}

exports. default = new HourController();
