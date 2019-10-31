import { Op } from 'sequelize';

import File from '../models/File';
import User from '../models/User';
import Subscription from '../models/Subscription';
import Course from '../models/Course';

class HourController {
  async index(req, res) {
    const student = await User.findOne({
      where: {
        id: req.userId,
      },
      attributes: ['id', 'name', 'registration'],
      include: [
        {
          model: Subscription,
          as: 'subscription',
          attributes: ['id', 'course_id', 'student_id'],
          include: [
            {
              model: Course,
              as: 'course',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    const files = await File.findAll({
      where: {
        user_id: req.userId,
        course_id: student.subscription.course_id,
        [Op.or]: [{ approved: true }, { approved: false }],
      },
      attributes: ['id', 'value', 'approved'],
    });

    const approved = files.filter(file => file.approved);

    const disapproved = files.filter(file => !file.approved);

    const hours = approved.map(file => {
      return file.value;
    });

    const sumHours = hours.reduce((sum, next) => sum + next);

    return res.json({
      student,
      hours: sumHours,
      approved_certs: approved.length,
      disapproved_certs: disapproved.length,
    });
  }
}

export default new HourController();
