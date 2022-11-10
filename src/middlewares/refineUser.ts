import { User } from '../models/user/User';
import { Middleware } from '../types/common';

export const refineUsers: Middleware = (req, res, next) => {
  User.find({ clubId: req.params.clubId })
    .then((users) => {
      if (users.length == 0)
        res.status(404).json({
          status: 'fail',
          error: '해당 동아리에 존재하는 유저가 없습니다.',
        });
      else {
        req.body.refinedUsers = users;
        next();
      }
    })
    .catch((error) => res.status(500).json({ status: 'fail', error: error }));
};
