"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class MonitorController {
  async store(req, res) {
    // validation
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    // Checks if user exists
    const user = await _User2.default.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    const { id, name, email, monitor } = await user.update({
      monitor: true,
    });

    return res.json({
      id,
      name,
      email,
      monitor,
    });
  }
}

exports. default = new MonitorController();
