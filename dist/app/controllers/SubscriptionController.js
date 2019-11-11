"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Course = require('../models/Course'); var _Course2 = _interopRequireDefault(_Course);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Subscription = require('../models/Subscription'); var _Subscription2 = _interopRequireDefault(_Subscription);

class SubscriptionController {
  async store(req, res) {
    const { courseId } = req.body;

    const course = await _Course2.default.findByPk(courseId);

    if (!course) {
      return res.status(400).json({
        error: 'Course not exists.',
      });
    }

    const { student_id, course_id } = await _Subscription2.default.create({
      student_id: req.userId,
      course_id: courseId,
    });

    const { name: student } = await _User2.default.findByPk(req.userId);

    return res.json({
      student_id,
      student,
      course_id,
      course: course.name,
    });
  }
}

exports. default = new SubscriptionController();
