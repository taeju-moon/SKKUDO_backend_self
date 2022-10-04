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
