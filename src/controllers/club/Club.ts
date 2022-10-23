import { Controller } from '../../types/common';
import { Club } from '../../models/club/Club';

export const getAllClubs: Controller = (req, res) => {
  console.log(req);
  //미들웨어로 accepted 된 것만 보여주기
  Club.find()
    .then((clubs) =>
      res.status(200).json({
        status: 'success',
        data: clubs,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getOneClub: Controller = (req, res) => {
  const id: string = req.params.id;
  Club.findById(id)
    .then((club) => {
      if (!club)
        res.status(404).json({ status: 'fail', error: 'club not found' });
      res.status(200).json({ status: 'success', data: club });
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const createClub: Controller = (req, res) => {
  const club = new Club(req.body);
  club.accepted = false;
  club
    .save()
    .then((club) =>
      res.status(200).json({
        status: 'success',
        data: club,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const updateClub: Controller = (req, res) => {
  const id: string = req.params.id;
  //accept는 acceptClub으로만 할 수 있음
  if (req.body.accepted)
    res.status(403).json({
      status: 'fail',
      error: "can't accept while updating",
    });
  Club.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data)
        res.status(400).json({ status: 'fail', error: 'Club not found' });
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

export const acceptClub: Controller = (req, res) => {
  const id: string = req.params.id;
  Club.findOneAndUpdate(
    { _id: id },
    {
      accepted: true,
    }
  )
    .then((data) => {
      if (!data)
        res.status(400).json({ status: 'fail', error: 'Club not found' });
      res.status(200).json({
        status: 'success',
        data: '동아리의 등록이 완료되었습니다.',
      });
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const deleteClub: Controller = (req, res) => {
  const id: string = req.params.id;
  Club.findByIdAndDelete(id)
    .then(() =>
      res.status(200).json({
        status: 'success',
        data: 'deleted successfully',
      })
    )
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
