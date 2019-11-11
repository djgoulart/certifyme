"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _Course = require('../models/Course'); var _Course2 = _interopRequireDefault(_Course);

class AvailableController {
  async index(req, res) {
    const course = await _Course2.default.findOne({
      where: {
        monitor_id: req.userId,
      },
      attributes: ['id', 'name', 'monitor_id', 'coordinator_id'],
      include: [
        {
          model: _User2.default,
          as: 'monitor',
          attributes: ['id', 'name'],
        },
      ],
    });

    const availables = await _File2.default.findAll({
      where: {
        course_id: course.id,
        approved: null,
      },
      attributes: [
        'id',
        'path',
        'url',
        'awaiting',
        'approved',
        'value',
        'user_id',
        'course_id',
      ],
      include: [
        {
          model: _User2.default,
          as: 'student',
          attributes: ['id', 'name', 'registration', 'cpf'],
        },
        {
          model: _Course2.default,
          as: 'course',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(availables);
  }
}

exports. default = new AvailableController();
