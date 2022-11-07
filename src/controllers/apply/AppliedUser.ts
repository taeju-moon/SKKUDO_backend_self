import { Controller } from '../../types/common';
import { AppliedUser } from '../../models/apply/AppliedUser';
import { Club } from '../../models/club/Club';

export const getAllAppliedUsers: Controller = (req, res) => {
  AppliedUser.find()
    .then((appliedUsers) =>
      res.status(200).json({
        status: 'success',
        data: appliedUsers,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getAppliedUsersByClubId: Controller = (req, res) => {
  const clubId: string = req.params.clubId;
  let users: any[] = [];
  Club.findById(clubId)
    .then((club) => {
      if (!club) {
        res
          .status(404)
          .json({ status: 'fail', error: '존재하지 않는 동아리입니다.' });
      } else {
        AppliedUser.find()
          .then((appliedUser) => {
            for (let i = 0; i < appliedUser.length; i++) {
              if (appliedUser[i].clubId.toString() === clubId) {
                users.push(appliedUser[i]);
              }
            }
            return res.status(200).json({
              status: 'success',
              data: users,
            });
          })
          .catch((error) => {
            return res.status(400).json({
              status: 'fail',
              error: error.message,
            });
          });
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const createAppliedUser: Controller = (req, res) => {
  req.body.createdAt = new Date();
  req.body.updatedAt = new Date();
  const appliedUser = new AppliedUser(req.body);
  const clubId = appliedUser.clubId.toString();
  Club.findById(clubId)
    .then((club) => {
      if (!club) {
        return res
          .status(404)
          .json({ status: 'fail', error: '존재하지 않는 동아리입니다.' });
      } else {
        appliedUser
          .save()
          .then((data) => {
            return res.status(200).json({ status: 'success', data });
          })
          .catch((error) => {
            return res
              .status(400)
              .json({ status: 'fail', error: error.message });
          });
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const updateAppliedUser: Controller = (req, res) => {
  req.body.updatedAt = new Date();
  const id: string = req.params.id;
  AppliedUser.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data)
        return res
          .status(400)
          .json({ status: 'fail', error: 'AppliedUser not found' });
      res.status(200).json({
        status: 'success',
        data,
      });
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const deleteAppliedUser: Controller = (req, res) => {
  AppliedUser.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const deleteAppliedUsersByClubId: Controller = (req, res) => {
  AppliedUser.deleteMany({ clubId: req.params.clubId })
    .then((data) =>
      res.status(200).json({
        status: 'success',
        data,
        message:
          '만약 지워지지 않은 경우 애초에 지원자가 없거나 clubId가 잘못되었을 수 있습니다.',
      })
    )
    .catch((error) => res.status(500).json({ status: 'fail', error }));
};
