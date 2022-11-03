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
import {
  auth,
  authBySuperUser,
  authByValidationTable,
} from '../../middlewares/auth';

const UserRouter = express.Router();

UserRouter.get('/', auth, authBySuperUser, getAllUsers);

UserRouter.get('/byClub/:clubId', authByValidationTable, getUsersByClubId);

UserRouter.get('/:id', getOneUser);

UserRouter.post('/', createUser);

UserRouter.patch('/:id', updateUser);

UserRouter.delete('/:id', deleteUser);

UserRouter.patch('/club/register/:id/:clubId', registerClub);

UserRouter.patch('/club/deregister/:id/:clubId', deregisterClub);

UserRouter.patch('/club/role/:id/:clubId', updateRole);

export default UserRouter;
