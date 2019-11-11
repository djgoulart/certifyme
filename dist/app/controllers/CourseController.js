"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _Course = require('../models/Course'); var _Course2 = _interopRequireDefault(_Course);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class CourseController {
  async index(req, res) {
    const courses = await _Course2.default.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
      include: [
        {
          model: _User2.default,
          as: 'monitor',
          attributes: ['id', 'name'],
        },
        {
          model: _User2.default,
          as: 'coordinator',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(courses);
  }

  async store(req, res) {
    // validation
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      monitor_id: Yup.number().required(),
      coordinator_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { name, monitor_id, coordinator_id } = req.body;

    const { id } = await _Course2.default.create({ name, monitor_id, coordinator_id });

    return res.json({ id, name, monitor_id, coordinator_id });
  }
}

exports. default = new CourseController();
