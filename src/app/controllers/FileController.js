import File from '../models/File';
import User from '../models/User';
import Course from '../models/Course';

class FileController {
  async index(req, res) {
    const files = await File.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'url', 'name', 'path'],
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

    const file = await File.create({ user_id: req.userId, name, path });

    return res.json(file);
  }
}

export default new FileController();
