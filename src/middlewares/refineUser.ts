import { User } from '../models/user/User';
import { User as UserInterface } from '../types/user';
import { Middleware } from '../types/common';

export const refineUsers: Middleware = (req, res, next) => {
  User.find()
    .then((users: UserInterface[]) => {
      users = users.filter((user) =>
        user.registeredClubs.get(req.params.clubId)
      );
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
