import { User } from '../../models/user/User';
import { User as UserInterface } from '../../types/user';
import { Club as ClubInterface } from '../../types/club';
import { Controller } from '../../types/common';
import { Role, Column } from '../../types/common';
import { RegisteredClub } from './../../types/user';
import { Club } from '../../models/club/Club';
import { AppliedUser } from '../../models/apply/AppliedUser';

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
  User.find()
    .then(async (users: UserInterface[]) => {
      const refinedUsers: UserInterface[] = await users.filter((user) => {
        return user.registeredClubs.get(clubId);
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

export const registerPassedUsers: Controller = async (req, res) => {
  const initialRole: Role = req.body.initialRole;
  const clubId: string = req.params.clubId;
  try {
    const club = await Club.findById(clubId);
    if (!club)
      res
        .status(404)
        .json({ status: 'fail', error: '해당 동아리가 존재하지 않습니다.' });
    else {
      const acceptedUsers = await AppliedUser.find({ clubId, pass: true });
      const invalidUsers: string[] = [];
      acceptedUsers.forEach(async (acceptedUser) => {
        const userID: string = acceptedUser.userID;
        const user = await User.findOne({ userID });
        if (!user) invalidUsers.push(userID);
        else {
          const newRegisteredClub: RegisteredClub = {
            clubId: clubId,
            role: initialRole,
            clubName: club?.name as string,
            moreColumns: acceptedUser.moreColumns,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          user.registeredClubs.set(clubId, newRegisteredClub);
          user.save();
        }
      });
      res.status(200).json({
        status: 'success',
        data: {
          invalidUsers: invalidUsers,
          acceptedUsers: acceptedUsers,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({ status: 'fail', error });
  }
};

interface moreColumnInterface {
  column: Column;
  value: string;
}
type moreColumnsType = moreColumnInterface[];

const validatMoreColumns = (
  moreColumns: moreColumnsType,
  clubUserColumn: Column[]
): string => {
  let fail = false;
  let message = '';
  clubUserColumn.forEach((column) => {
    const searchingkey = column.key;
    let found = 0;
    moreColumns.forEach((item) => {
      if (item.column.key === searchingkey) found = 1;
    });
    if (!found) {
      fail = true;
      message = `moreColumns: ${searchingkey}에 상응하는 값이 칼럼이 존재하지 않습니다.`;
    }
  });
  if (!fail) return 'success';
  else return message;
};

export const registerClub: Controller = async (req, res) => {
  const id = req.params.id;
  const clubId: string = req.params.clubId;
  const { initialRole, moreColumns } = req.body;
  const club: ClubInterface = (await Club.findOne({
    _id: clubId,
  })) as ClubInterface;
  User.findOne({ userID: id })
    .then((user) => {
      if (!user)
        res.status(404).json({ status: 'fail', error: 'user not found' });
      else {
        const validation: string = validatMoreColumns(
          moreColumns,
          club.userColumns as Column[]
        );
        if (validation !== 'success')
          res.status(404).json({ status: 'fail', error: validation });
        else {
          Club.findById(clubId).then(async (usingClub) => {
            const newRegisteredClub: RegisteredClub = {
              clubId: clubId,
              role: initialRole,
              clubName: usingClub?.name as string,
              moreColumns: moreColumns,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            user.registeredClubs.set(clubId, newRegisteredClub);
            user
              .save()
              .then((data) => res.status(200).json({ status: 'success', data }))
              .catch((error) =>
                res.status(500).json({ status: 'fail', error: error.message })
              );
          });
        }
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
    .then((user: any) => {
      if (!user)
        res.status(404).json({ status: 'fail', error: 'user not found' });
      else {
        const registeredClub: RegisteredClub = user.registeredClubs.get(clubId);
        if (!registeredClub)
          res.status(404).json({
            status: 'fail',
            error: '해당 유저는 해당 동아리에 속하지 않습니다.',
          });
        else {
          registeredClub.role = updatingRole;
          user.registeredClubs.set(clubId, registeredClub);
          user
            .save()
            .then((data: RegisteredClub) =>
              res.status(200).json({ status: 'success', data })
            )
            .catch((error: any) =>
              res.status(400).json({ status: 'fail', error: error.message })
            );
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
        const registeredClub: RegisteredClub | undefined =
          user.registeredClubs.get(clubId);
        if (!registeredClub)
          res.status(404).json({
            status: 'fail',
            error: '해당 유저는 해당 동아리에 속하지 않습니다.',
          });
        else {
          user.registeredClubs.delete(clubId);
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

export const updateUsercolumn: Controller = (req, res) => {
  const { key, value } = req.body;
  const userID = req.body.authUser.userID;
  const clubId = req.params.clubId;
  User.findOne({ userID }).then((user) => {
    if (!user)
      res.status(404).json({ status: 'fail', error: 'user not found' });
    else {
      user.updateValue(clubId, key, value);
      res.status(200).json({ status: 'success', data: user });
    }
  });
};
