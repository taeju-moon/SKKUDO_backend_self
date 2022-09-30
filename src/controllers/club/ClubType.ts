import { Controller } from '../../types/common';
import { ClubType } from '../../models/club/ClubType';

export const getAllClubTypes: Controller = (req, res) => {
  ClubType.find()
    .then((clubtypes) =>
      res.status(200).json({
        status: 'success',
        data: clubtypes,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getOneClubType: Controller = (req, res) => {
  const id: string = req.params.id;
  ClubType.findById(id)
    .then((clubtype) => {
      if (!clubtype)
        res.status(404).json({ status: 'fail', error: 'clubtype not found' });
      res.status(200).json({ status: 'success', data: clubtype });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createClubType: Controller = (req, res) => {
  const clubType = new ClubType(req.body);
  clubType
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const deleteClubType: Controller = (req, res) => {
  ClubType.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
