"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

class Subscription extends _sequelize.Model {
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

exports. default = Subscription;
