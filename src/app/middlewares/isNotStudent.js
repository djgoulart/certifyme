import { Op } from 'sequelize';
import User from '../models/User';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  const isNotStudent = await User.findOne({
    where: {
      id: req.userId,
      [Op.or]: [{ admin: true }, { monitor: true }, { coordinator: true }],
    },
  });

  if (!isNotStudent) {
    return res.status(401).json({
      error: 'You are not authorized to perform this action.',
    });
  }

  next();
};
