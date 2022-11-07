import express from 'express';
import {
  getAllAppliedUsers,
  getAppliedUsersByClubId,
  getAppliedUsersByUserId,
  createAppliedUser,
  updateAppliedUser,
  deleteAppliedUser,
  deleteAppliedUsersByClubId,
} from '../../controllers/apply/AppliedUser';
import {
  authByValidationTable,
  auth,
  authBySuperUser,
} from '../../middlewares/auth';

const AppliedUserRouter = express.Router();

AppliedUserRouter.get('/', auth, authBySuperUser, getAllAppliedUsers);

AppliedUserRouter.get(
  '/byClub/:clubId',
  authByValidationTable,
  getAppliedUsersByClubId
);

AppliedUserRouter.get('/byUser', auth, getAppliedUsersByUserId);

AppliedUserRouter.post('/', authByValidationTable, createAppliedUser);

AppliedUserRouter.patch('/:id', authByValidationTable, updateAppliedUser);

AppliedUserRouter.delete('/:id', authByValidationTable, deleteAppliedUser);

AppliedUserRouter.delete(
  '/club/:clubId',
  authByValidationTable,
  deleteAppliedUsersByClubId
);

export default AppliedUserRouter;
