import User from '../models/User';
import File from '../models/File';
import Course from '../models/Course';

class AvailableController {
  async index(req, res) {
    const course = await Course.findOne({
      where: {
        monitor_id: req.userId,
      },
      attributes: ['id', 'name', 'monitor_id', 'coordinator_id'],
      include: [
        {
          model: User,
          as: 'monitor',
          attributes: ['id', 'name'],
        },
      ],
    });

    const availables = await File.findAll({
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
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'registration', 'cpf'],
        },
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(availables);
  }
}

export default new AvailableController();
