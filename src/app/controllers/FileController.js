import File from '../models/File';
import User from '../models/User';
import Course from '../models/Course';
import Subscription from '../models/Subscription';

class FileController {
  async index(req, res) {
    const files = await File.findAll({
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
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'email', 'cpf'],
        },
        {
          model: Course,
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
    } = await User.findOne({
      where: { id: req.userId },
      include: [{ model: Subscription, as: 'subscription' }],
    });

    const { id, url, user_id, awaiting, approved, value } = await File.create({
      user_id: req.userId,
      course_id,
      name,
      path,
    });

    return res.json({ id, course_id, user_id, url, awaiting, approved, value });
  }
}

export default new FileController();
