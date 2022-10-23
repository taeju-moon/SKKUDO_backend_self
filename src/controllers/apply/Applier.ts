import { Controller } from '../../types/common';
import { Applier } from '../../models/apply/Applier';
import { Club } from '../../models/club/Club';

export const getAllAppliers: Controller = (req, res) => {
  Applier.find()
    .then((appliers) =>
      res.status(200).json({
        status: 'success',
        data: appliers,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getApplierByClubId: Controller = (req, res) => {
  const clubId: string = req.params.clubId;
  Club.findById(clubId)
    .then((club) => {
      if (!club) {
        res.status(404).json({ status: 'fail', error: '존재하지 않는 동아리입니다.' });
      }
      else {
        Applier.find()
          .then((appliers) => {
            for (let i = 0; i < appliers.length; i++) {
              if (appliers[i].clubId.toString() === clubId) {
                return res.status(200).json({
                  status: 'success',
                  data: appliers[i],
                })
              }
            }
            return res.status(404).json({
              status: 'fail',
              error: '해당 동아리가 Applier를 가지고 있지 않습니다.'
            })
          })
          .catch((error) => {
            return res.status(400).json({
              status: 'fail',
              error: error.message,
            })
          })
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    )
};

export const createApplier: Controller = (req, res) => {
  const applier = new Applier(req.body);
  Club.findById(applier.clubId.toString())
    .then((club) => {
      if (!club) {
        res.status(404).json({ status: 'fail', error: '존재하지 않는 동아리입니다.' });
      }
      else {
        Applier.find()
          .then((appliers) => {
            for (let i = 0; i < appliers.length; i++) {
              if (appliers[i].clubId.toString() === applier.clubId.toString()) {
                return res.status(400).json({
                  status: 'fail',
                  error: '해당 동아리가 이미 Applier를 가지고 있습니다.',
                })
              }
            }
            applier
              .save()
              .then((data) => { 
                return res.status(200).json({ status: 'success', data })
              })
              .catch((error) => {
                return res.status(400).json({ status: 'fail', error: error.message })
              });
          })
          .catch((error) => {
            return res.status(400).json({
              status: 'fail',
              error: error.message,
            })
          })
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    )
};

export const updateApplier: Controller = (req, res) => {
  const id: string = req.params.id;
  Applier.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data)
        return res.status(400).json({ status: 'fail', error: 'Applier not found' });
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

export const addApplierColumn: Controller = (req, res) => {
  
};

export const deleteApplier: Controller = (req, res) => {
  Applier.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
