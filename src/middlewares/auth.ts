import { User } from '../models/user/User';
import { Middleware } from '../types/common';
import { User as UserInterface } from '../types/user';

export const auth: Middleware = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res
        .status(404)
        .json({ status: 'fail', error: '인증 정보가 없습니다' });
    req.body.authToken = token;
    req.body.authUser = user;
    next();
  });
};

export const authByClub: Middleware = (req, res, next) => {
  const token = req.cookies.x_auth;
  const clubId = req.params.clubId;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res
        .status(404)
        .json({ status: 'fail', error: '인증 정보가 없습니다' });
    const identifiedUser: UserInterface = user;
    identifiedUser.registeredClubs.forEach((item) => {
      if (String(item.clubId) === clubId) {
        req.body.authToken = token;
        req.body.authUser = user;
        next();
      }
    });
    res
      .status(403)
      .json({
        status: 'fail',
        error: '인증 정보가 해당 동아리에 속하지 않습니다.',
      });
  });
};
