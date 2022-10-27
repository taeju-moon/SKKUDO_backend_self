import express from 'express';
import {
  getAllUsers,
  getUsersByClubId,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  registerClub,
  deregisterClub,
  updateRole,
} from '../../controllers/user/User';
import { authByValidationTable } from '../../middlewares/auth';

const UserRouter = express.Router();

UserRouter.get('/', getAllUsers);

UserRouter.get('/byClub/:clubId', authByValidationTable, getUsersByClubId);

UserRouter.get('/:id', getOneUser);

UserRouter.post('/', authByValidationTable, createUser);

UserRouter.patch('/:id', updateUser);

UserRouter.delete('/:id', deleteUser);

UserRouter.patch(
  '/club/register/:id/:clubId',
  authByValidationTable,
  registerClub
);

UserRouter.patch(
  '/club/deregister/:id/:clubId',
  authByValidationTable,
  deregisterClub
);

UserRouter.patch('/club/role/:id/:clubId', authByValidationTable, updateRole);

export default UserRouter;
