import { User, userSchema } from '../models/user/User';
import { Middleware } from '../types/common';
import { User as UserInterface, RegisteredClub } from '../types/user';
import { Method, Role } from '../types/common';
import { Validation } from '../models/validation/validation';
import { Validation as ValidationInterface } from '../types/validation';

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
        .status(401)
        .json({ status: 'fail', error: '인증 정보가 없습니다' });
    const identifiedUser: UserInterface = user;
    identifiedUser.registeredClubs.forEach((item) => {
      if (String(item.clubId) === clubId) {
        req.body.authToken = token;
        req.body.authUser = user;
        next();
      }
    });
    res.status(403).json({
      status: 'fail',
      error: '인증 정보가 해당 동아리에 속하지 않습니다.',
    });
  });
};

export const authByValidationTable: Middleware = async (req, res, next) => {
  const method: Method = req.method as Method;
  const originalUrl = req.originalUrl;
  const token = req.cookies.x_auth;
  const clubId: string = req.params.clubId;
  const validation: ValidationInterface | null = await Validation.findOne({
    clubId,
  });
  if (!validation) {
    res.status(401).json({
      status: 'fail',
      error: '해당 동아리는 인증 테이블을 가지고 있지 않습니다.',
    });
  } else {
    const validator: Role = await Validation.findValidator(
      validation,
      method,
      originalUrl
    );
    User.findByToken(token, (err, user) => {
      if (err) throw Error(err);
      User.findById(user?.userID)
        .then((user) => {
          if (!user) {
            res.status(404).json({ status: 'fail', error: 'user not found' });
          } else {
            const registeredClub: RegisteredClub | null =
              user.findByClubId(clubId);
            if (!registeredClub)
              return res.status(403).json({
                status: 'fail',
                error: '동아리에 가입되어있지 않습니다.',
              });
            else {
              const result = Validation.validateUser(validator, '운영진');
              console.log(result);
            }
          }
        })
        .catch((error) =>
          res.status(500).json({ status: 'fail', error: error.message })
        );
    });
  }
};
