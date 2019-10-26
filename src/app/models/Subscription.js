import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Course, {
      foreignKey: 'course_id',
      as: 'course',
    });
  }
}

export default Subscription;
