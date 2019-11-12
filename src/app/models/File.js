import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        value: Sequelize.INTEGER,
        approved: Sequelize.BOOLEAN,
        awaiting: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.approved === null;
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'student' });
    this.belongsTo(models.Course, {
      foreignKey: 'course_id',
      as: 'course',
    });
  }
}

export default File;
