import { User } from '../models/user/User';
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
    const identifiedUser: any = user;
    if (identifiedUser.registeredClubs.get(String(clubId))) next();
    else {
      res.status(403).json({
        status: 'fail',
        error: '인증 정보가 해당 동아리에 속하지 않습니다.',
      });
    }
  });
};

//auth 미들웨어를 통과한 이후 시행해야함
export const authBySuperUser: Middleware = (req, res, next) => {
  const user: UserInterface = req.body.authUser;
  if (process.env.SUPER_USERS?.includes(user.userID)) {
    next();
  } else {
    res
      .status(403)
      .json({ status: 'fail', error: '관리자만 수행할 수 있는 기능입니다.' });
  }
};

export const authByValidationTable: Middleware = async (req, res, next) => {
  const method: Method = req.method as Method;
  const originalUrl = req.originalUrl;
  const token = req.cookies.x_auth;
  const clubId: string = req.params.clubId
    ? req.params.clubId
    : req.body.clubId;
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
      User.findOne({ userID: user?.userID })
        .then((user) => {
          if (!user) {
            res
              .status(404)
              .json({ status: 'fail', error: '인증 정보가 없습니다.' });
          } else {
            const registeredClub: RegisteredClub | null =
              user.findByClubId(clubId);
            if (!registeredClub)
              return res.status(403).json({
                status: 'fail',
                error: '동아리에 가입되어있지 않습니다.',
              });
            else {
              const result = Validation.validateUser(
                validator,
                registeredClub.role
              );
              if (result) next();
              else
                res.status(403).json({
                  status: 'fail',
                  error: `${validator}이상의 권한이 필요합니다.`,
                });
            }
          }
        })
        .catch((error) =>
          res.status(500).json({ status: 'fail', error: error.message })
        );
    });
  }
};
