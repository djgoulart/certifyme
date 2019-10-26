import Sequelize, { Model } from 'sequelize';

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'monitor_id', as: 'monitor' });
    this.belongsTo(models.User, {
      foreignKey: 'coordinator_id',
      as: 'coordinator',
    });
  }
}

export default Course;
