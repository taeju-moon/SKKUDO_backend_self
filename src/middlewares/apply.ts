import { AppliedUser } from '../models/apply/AppliedUser';
import { Middleware } from '../types/common';

export const isThereAppliedUsers: Middleware = (req, res, next) => {
  AppliedUser.find({ clubId: req.params.clubId })
    .then((data) => {
      if (data.length !== 0)
        res.status(403).json({
          status: 'fail',
          error:
            '이미 지원한 유저가 있어 지원 양식을 수정/삭제 할 수 없습니다. 지원자들을 모두 삭제하고 이용해주세요.',
        });
      else next();
    })
    .catch((err) => res.status(500).json({ status: 'fail', error: err }));
};
