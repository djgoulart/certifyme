import * as Yup from 'yup';

import User from '../models/User';

class CoordinatorController {
  async store(req, res) {
    // validation
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    // Checks if user exists
    const user = await User.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    const { id, name, email, coordinator } = await user.update({
      coordinator: true,
    });

    return res.json({
      id,
      name,
      email,
      coordinator,
    });
  }
}

export default new CoordinatorController();
