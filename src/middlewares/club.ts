import { Middleware } from '../types/common';
import { Applier } from '../models/apply/Applier';

export const isApplierExist: Middleware = (req, res, next) => {
  const clubId = req.params.clubId;
  Applier.find({ clubId }).then((data) => {
    if (data) {
      res.status(403).json({
        status: 'fail',
        error: '모집공고가 있는 상태에서 club의 유저컬럼을 변경할 수 없습니다.',
      });
    } else {
      next();
    }
  });
};
