import { User } from '../../models/user/User';
import { User as UserInterface } from '../../types/user';
import { Controller } from '../../types/common';
import { Types } from 'mongoose';
import { Role } from '../../types/common';
import { RegisteredClub } from './../../types/user';
import { Club } from '../../models/club/Club';

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
  const refine = (registeredClubs: RegisteredClub[], clubId: string) => {
    let found = 0;
    registeredClubs.forEach((club) => {
      if (String(club.clubId) === clubId) found = 1;
    });
    return found;
  };

  User.find()
    .then(async (users: UserInterface[]) => {
      const refinedUsers: UserInterface[] = await users.filter((user) => {
        return refine(user.registeredClubs, clubId);
      });
      if (!refinedUsers)
        res.status(404).json({ status: 'fail', error: '404 not found' });
      res.status(200).json({
        status: 'success',
        data: refinedUsers,
      });
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const getOneUser: Controller = (req, res) => {
  const id = req.params.id;
  User.findOne({ userID: id })
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

export const registerClub: Controller = async (req, res) => {
  const id = req.params.id;
  const clubId = req.params.clubId;
  const { initialRole, moreColumns } = req.body;
  User.findOne({ userID: id })
    .then(async (user) => {
      if (!user)
        res.status(404).json({ status: 'fail', error: 'user not found' });
      else {
        const usingClub = await Club.findById(clubId);
        if (!usingClub)
          res.status(404).json({ status: 'fail', error: 'club not found' });
        const newRegisteredClub: RegisteredClub = {
          clubId: new Types.ObjectId(clubId),
          clubName: '',
          role: initialRole,
          clubName: usingClub?.name as string,
          moreColumns: moreColumns,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        user.registeredClubs = [...user.registeredClubs, newRegisteredClub];
        user
          .save()
          .then((user) =>
            res.status(200).json({ status: 'success', data: user })
          )
          .catch((error) =>
            res.status(400).json({ status: 'fail', error: error.message })
          );
      }
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const updateRole: Controller = (req, res) => {
  const id = req.params.id;
  const clubId = req.params.clubId;
  const updatingRole: Role = req.body.updatingRole;
  User.findOne({ userID: id })
    .then((user) => {
      if (!user)
        res.status(404).json({ status: 'fail', error: 'user not found' });
      else {
        let found = 0;
        user.registeredClubs.forEach((registeredClub: RegisteredClub) => {
          if (String(registeredClub.clubId) === clubId) {
            registeredClub.role = updatingRole;
            found = 1;
          }
        });
        if (found) {
          user
            .save()
            .then((user) =>
              res.status(200).json({ status: 'success', data: user })
            )
            .catch((error) =>
              res.status(500).json({ status: 'fail', error: error.message })
            );
        } else {
          res.status(404).json({
            status: 'fail',
            error: '해당 유저는 해당 동아리에 속하지 않습니다.',
          });
        }
      }
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const deregisterClub: Controller = (req, res) => {
  const id = req.params.id;
  const clubId = req.params.clubId;
  User.findOne({ userID: id })
    .then((user) => {
      if (!user)
        res.status(404).json({ status: 'fail', error: 'user not found' });
      else {
        const updated = user.registeredClubs.filter(
          (club) => String(club.clubId) !== clubId
        );
        if (updated.length === user.registeredClubs.length)
          res.status(404).json({
            status: 'fail',
            error: '해당 유저는 해당 동아리에 속하지 않습니다.',
          });
        else {
          user.registeredClubs = updated;
          user
            .save()
            .then((user) =>
              res.status(200).json({ status: 'success', data: user })
            )
            .catch((error) =>
              res.status(500).json({ status: 'fail', error: error.message })
            );
        }
      }
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
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
