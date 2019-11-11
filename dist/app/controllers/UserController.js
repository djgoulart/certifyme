"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Subscription = require('../models/Subscription'); var _Subscription2 = _interopRequireDefault(_Subscription);
var _Course = require('../models/Course'); var _Course2 = _interopRequireDefault(_Course);

class UserController {
  async index(req, res) {
    const users = await _User2.default.findAll({
      where: {
        admin: false,
        coordinator: false,
        monitor: false,
      },
      attributes: ['id', 'name', 'cpf', 'registration'],
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

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cpf: Yup.string().max(11),
      registration: Yup.string(),
      password: Yup.string()
        .min(6)
        .required(),
      passwordConfirm: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const emailExists = await _User2.default.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already being used' });
    }

    const { id, name, email, cpf, registration } = await _User2.default.create(req.body);

    return res.json({
      id,
      name,
      email,
      cpf,
      registration,
    });
  }

  async update(req, res) {
    // validation
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      cpf: Yup.string().max(11),
      registration: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      passwordConfirm: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const user = await _User2.default.findByPk(req.userId);

    const { email, oldPassword, cpf, registration } = req.body;

    if (email && email !== user.email) {
      const emailExists = await _User2.default.findOne({
        where: { email: req.body.email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Email already being used' });
      }
    }

    /**
     * Check if cpf already exists
     */
    if (cpf && cpf !== user.cpf) {
      const cpfExists = await _User2.default.findOne({
        where: { cpf: req.body.cpf },
      });

      if (cpfExists) {
        return res.status(400).json({ error: 'Cpf already being used' });
      }
    }

    /**
     * Check if registration already exists
     */
    if (registration && registration !== user.registration) {
      const registrationExists = await _User2.default.findOne({
        where: { registration: req.body.registration },
      });

      if (registrationExists) {
        return res
          .status(400)
          .json({ error: 'Registration already being used' });
      }
    }

    /**
     * User have to know his old password in order to change password.
     */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      cpf,
      registration,
    });
  }
}

exports. default = new UserController();
