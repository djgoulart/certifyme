"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Course = require('../models/Course'); var _Course2 = _interopRequireDefault(_Course);
var _Subscription = require('../models/Subscription'); var _Subscription2 = _interopRequireDefault(_Subscription);

class FileController {
  async index(req, res) {
    const files = await _File2.default.findAll({
      where: { user_id: req.userId },
      attributes: [
        'id',
        'url',
        'name',
        'path',
        'awaiting',
        'approved',
        'value',
      ],
      include: [
        {
          model: _User2.default,
          as: 'student',
          attributes: ['id', 'name', 'email', 'cpf'],
        },
        {
          model: _Course2.default,
          as: 'course',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(files);
  }

  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const {
      subscription: { course_id },
    } = await _User2.default.findOne({
      where: { id: req.userId },
      include: [{ model: _Subscription2.default, as: 'subscription' }],
    });

    const { id, url, user_id, awaiting, approved, value } = await _File2.default.create({
      user_id: req.userId,
      course_id,
      name,
      path,
    });

    return res.json({ id, course_id, user_id, url, awaiting, approved, value });
  }
}

exports. default = new FileController();
