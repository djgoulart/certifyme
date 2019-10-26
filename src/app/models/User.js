import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        registration: Sequelize.STRING,
        monitor: Sequelize.BOOLEAN,
        coordinator: Sequelize.BOOLEAN,
        admin: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasOne(models.Subscription, {
      foreignKey: 'student_id',
      as: 'subscription',
    });
  }
}

export default User;
