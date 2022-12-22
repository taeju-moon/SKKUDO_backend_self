import { Controller } from '../../types/common';
import { Club, clubSchema } from '../../models/club/Club';
import { Validation } from '../../models/validation/validation';
import { Column } from '../../types/common';
import { User } from '../../models/user/User';
import { RegisteredClub } from '../../types/user';
import { Types } from 'mongoose';
import fs from 'fs';

export const getAllClubs: Controller = (req, res) => {
  //미들웨어로 accepted 된 것만 보여주기
  Club.find({ accepted: true })
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

export const getNotAcceptedClubs: Controller = (req, res) => {
  Club.find({ accepted: false })
    .then((clubs) => {
      res.status(200).json({ status: 'success', data: clubs });
    })
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
    );
};

export const getOneClub: Controller = (req, res) => {
  const id: string = req.params.clubId;
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
  club.initializer = req.body.authUser._id;
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
  const id: string = req.params.clubId;
  //accept는 acceptClub으로만 할 수 있음
  if (req.body.accepted)
    res.status(403).json({
      status: 'fail',
      error: "can't accept while updating",
    });
  if (req.body.userColumns)
    res.status(403).json({
      status: 'fail',
      error: '유저 컬럼은 별도의 라우터를 사용하여 수정하세요.',
    });
  const nameChanging = req.body.name;
  Club.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).json({ status: 'fail', error: 'Club not found' });
      } else {
        if (nameChanging) {
          User.find({ clubId: id })
            .then((users) => {
              users.forEach((user) => user.updateClubName(id, req.body.name));
              res.status(200).json({ status: 'success', data });
            })
            .catch((error) =>
              res.status(500).json({ status: 'fail', error: error })
            );
        } else {
          res.status(200).json({
            status: 'success',
            data,
          });
        }
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const acceptClub: Controller = async (req, res) => {
  try {
    const id: string = req.params.clubId;
    const club = await Club.findOne({ _id: id });
    //1. 동아리를 accept한다.
    if (!club) {
      res.status(404).json({ status: 'fail', error: 'Club not found' });
      return;
    }
    club.accepted = true;
    const initializer: string = club.initializer as string;
    const user = await User.findOne({ id: initializer });
    //2. 설립자를 회장으로 등록한다.
    if (!user) {
      res.status(404).json({
        status: 'fail',
        error:
          '동아리의 설립자가 없습니다. DB에 corruption이 있을 수 있습니다.',
      });
      return;
    }
    const newRegisteredClub: RegisteredClub = {
      clubId: id,
      role: '회장',
      clubName: club.name,
      moreColumns: [],
      image: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    user.registeredClubs.set(id, newRegisteredClub);
    //해당 동아리의 ValidationTable을 만든다.
    const validation = new Validation();
    validation.clubId = new Types.ObjectId(req.params.clubId);
    await validation.save();
    await user.save();
    await club.save();
    res.status(200).json({ status: 'success', data: club });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error });
  }
};

export const deleteClub: Controller = (req, res) => {
  const id: string = req.params.clubId;
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
  //모든 클럽과 관련한 모델들 지우기
};

export const addClubUserColumn: Controller = async (req, res) => {
  try {
    const clubId: string = req.params.clubId;
    const newColumn: Column = req.body.userColumn;
    const club: any = await Club.findOne({ _id: clubId });
    if (!club)
      res.status(404).json({ status: 'fail', error: 'club not found' });
    else {
      let found = 0;
      club.userColumns.forEach((item: Column) => {
        if (item.key == newColumn.key) found++;
      });
      if (found) {
        res.status(403).json({
          status: 'fail',
          error: '이미 존재하는 컬럼을 추가하려고 합니다.',
        });
      } else {
        club.userColumns = [...club.userColumns, newColumn];
        req.body.refinedUsers.forEach((user: any) => {
          user.addColumn(clubId, newColumn, '');
        });
        club.save();
        res.status(200).json({ status: 'success', data: club });
      }
    }
  } catch (error: any) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

export const updateClubUserColumn: Controller = async (req, res) => {
  try {
    const clubId: string = req.params.clubId;
    const key: string = req.body.key;
    const newColumn: Column = req.body.newColumn;
    const club = await Club.findOne({ _id: clubId });
    if (!club)
      res.status(404).json({ status: 'fail', error: 'club not found' });
    else {
      let found = 0;
      club.userColumns = club.userColumns.map((column) => {
        if (column.key === key) {
          found++;
          return newColumn;
        } else return column;
      });
      let using = 0;
      club.userColumns.forEach((column: Column) => {
        if (column.key === newColumn.key) using++;
      });
      if (!found) {
        res.status(404).json({ status: 'fail', error: 'column key not found' });
      } else {
        if (using) {
          res.status(403).json({
            status: 'fail',
            error: '바꾸려는 Column의 key는 이미 사용중입니다.',
          });
        } else {
          req.body.refinedUsers.forEach((user: any) => {
            user.updateColumn(clubId, key, newColumn);
          });
          club.save();
          res.status(200).json({ status: 'success', data: club });
        }
      }
    }
  } catch (error: any) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

export const deleteClubUserColumn: Controller = async (req, res) => {
  try {
    const clubId: string = req.params.clubId;
    const key: string = req.body.key;
    const club = await Club.findOne({ _id: clubId });
    if (!club)
      res.status(404).json({ status: 'fail', error: 'club not found' });
    else {
      club.userColumns = club.userColumns.filter(
        (userColumn) => userColumn.key !== key
      );
      req.body.refinedUsers.forEach((user: any) => {
        user.deleteColumn(clubId, key);
      });
      club.save();
      res.status(200).json({ status: 'success', data: club });
    }
  } catch (error: any) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

export const uploadImage: Controller = async (req, res) => {
  const id: string = req.params.clubId;
  Club.findById(id)
    .then((club) => {
      if (!club) {
        res.status(404).json({ status: 'fail', error: 'club not found' });
      } else {
        if (!req.file) {
          res.status(400).json({ status: 'fail', error: 'image not found' });
        } else {
          if (club.image) {
            try {
              fs.unlinkSync(club.image);
            } catch (error) {
              return res
                .status(400)
                .json({ status: 'fail', error: 'image not deleted' });
            }
          }
          club.image = req.file.path;
          User.find({ clubId: id })
            .then((users) => {
              users.forEach((user) => user.updateImage(id, club.image));
              club.save();
              res.status(200).json({ status: 'success', club });
            })
            .catch((error) =>
              res.status(500).json({ status: 'fail', error: error })
            );
        }
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};
