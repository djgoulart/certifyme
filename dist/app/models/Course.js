"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Course extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
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

exports. default = Course;
