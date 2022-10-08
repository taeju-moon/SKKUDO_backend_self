import { User } from '../../models/user/User';
import { User as UserInterface } from '../../types/user';
import { Controller } from '../../types/common';
import { Request, Response } from 'express';

export const getAllUsers: Controller = (req, res) => {
  User.find()
    .then((users) =>
      res.status(200).json({
        status: 'success',
        data: users,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getUsersByClubId: Controller = (req, res) => {
  const clubId: string = req.params.clubId;
  //로직 적기
};

export const getOneUser: Controller = (req, res) => {
  const id = req.params.userID;
  User.find({ userID: id })
    .then((user) =>
      res.status(200).json({
        status: 'success',
        data: user,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 400,
        error: error.message,
      })
    );
};

export const createUser: Controller = (req, res) => {
  try {
    const user = new User(req.body);
    user
      .save()
      .then((newUser: UserInterface) =>
        res.status(200).json({
          status: 'success',
          data: newUser,
        })
      )
      .catch((error: any) =>
        res.status(400).json({
          status: 'fail',
          error: error.message,
        })
      );
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
};

export const updateUser: Controller = (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (body.registeredClubs) {
    res.status(403).json({
      status: 'fail',
      error: '직접적으로 유저의 동아리 정보를 변경할 수 없습니다.',
    });
  } else {
    User.findOneAndUpdate({ userID: id }, body)
      .then((data) => {
        if (!data)
          res.status(404).json({
            status: 'fail',
            error: '해당 아이디에 해당하는 유저가 없습니다.',
          });
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
  }
};

export const updateUserClub: Controller = (req, res) => {
  const id = req.params.id;
  const clubId = req.params.clubId;
  // const user:UserInterface = User.findOne({ userID: id });
  // if (!user) res.status(404).json({ status: 'fail', error: 'user not found' });
  // user.registeredClubs.forEach((elem)=>);
};

export const deleteUser: Controller = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() =>
      res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
      })
    )
    .catch((error: any) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};
