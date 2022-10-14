import { User } from '../models/user/User';
import { Middleware } from '../types/common';

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
