import * as Yup from 'yup';

import User from '../models/User';

class UserController {
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

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already being used' });
    }

    const { id, name, email, cpf, registration } = await User.create(req.body);

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

    const user = await User.findByPk(req.userId);

    const { email, oldPassword, cpf, registration } = req.body;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({
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
      const cpfExists = await User.findOne({
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
      const registrationExists = await User.findOne({
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

export default new UserController();
