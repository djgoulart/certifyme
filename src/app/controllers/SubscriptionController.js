import Course from '../models/Course';
import User from '../models/User';
import Subscription from '../models/Subscription';

class SubscriptionController {
  async store(req, res) {
    const { courseId } = req.body;

    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(400).json({
        error: 'Course not exists.',
      });
    }

    const { student_id, course_id } = await Subscription.create({
      student_id: req.userId,
      course_id: courseId,
    });

    const { name: student } = await User.findByPk(req.userId);

    return res.json({
      student_id,
      student,
      course_id,
      course: course.name,
    });
  }
}

export default new SubscriptionController();
