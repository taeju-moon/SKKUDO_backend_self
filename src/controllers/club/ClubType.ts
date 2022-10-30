import { Controller } from '../../types/common';
import { ClubType, clubTypeSchema } from '../../models/club/ClubType';
import { ClubType as ClubTypeInterface } from '../../types/club';
import { Club } from '../../models/club/Club';
import { Club as ClubInterface } from '../../types/club';

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
  ClubType.findById(req.params.id)
    .then((data) => {
      if (!data)
        res.status(404).json({ status: 'fail', error: 'club not found' });
      else {
        const usingType = data.name;
        let found: boolean = false;
        Club.find()
          .then((clubs: ClubInterface[]) => {
            clubs.forEach((club) => {
              if (club.type.name === usingType) found = true;
            });
          })
          .then(() => {
            if (found)
              res.status(403).json({
                status: 'fail',
                error: '해당 유형을 사용하고 있는 동아리가 존재합니다.',
              });
            else {
              data
                .remove()
                .then((data) =>
                  res.status(200).json({ status: 'success', data })
                )
                .catch((error) =>
                  res.status(500).json({ status: 'fail', error: error.message })
                );
            }
          })
          .catch((error) =>
            res.status(500).json({ status: 'fail', error: error.message })
          );
      }
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
