import * as Yup from 'yup';

import Course from '../models/Course';
import User from '../models/User';

class CourseController {
  async index(req, res) {
    const courses = await Course.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
      include: [
        {
          model: User,
          as: 'monitor',
          attributes: ['id', 'name'],
        },
        {
          model: User,
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

    const { id } = await Course.create({ name, monitor_id, coordinator_id });

    return res.json({ id, name, monitor_id, coordinator_id });
  }
}

export default new CourseController();
