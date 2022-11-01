import { AppliedUser } from '../models/apply/AppliedUser';
import { Middleware } from '../types/common';

export const isThereAppliedUsers: Middleware = (req, res, next) => {
  AppliedUser.find({ clubId: req.params.clubId })
    .then((data) => {
      if (data)
        res.status(403).json({
          status: 'fail',
          error: '이미 해당 Applier에 지원한 유저가 있습니다.',
        });
      else next();
    })
    .catch((err) => res.status(500).json({ status: 'fail', error: err }));
};
