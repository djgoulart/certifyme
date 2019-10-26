import Sequelize from 'sequelize';

import User from '../app/models/User';
import Course from '../app/models/Course';
import File from '../app/models/File';
import Subscription from '../app/models/Subscription';

import databaseConfig from '../config/database';

const models = [User, Course, File, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
