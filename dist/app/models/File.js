"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class File extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        path: _sequelize2.default.STRING,
        value: _sequelize2.default.INTEGER,
        approved: _sequelize2.default.BOOLEAN,
        awaiting: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return this.approved === null;
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
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

exports. default = File;
