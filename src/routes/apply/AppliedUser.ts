import express from 'express';
import {
  getAllAppliedUsers,
  getAppliedUsersByClubId,
  createAppliedUser,
  updateAppliedUser,
  deleteAppliedUser,
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

AppliedUserRouter.post('/', authByValidationTable, createAppliedUser);

AppliedUserRouter.patch('/:id', authByValidationTable, updateAppliedUser);

AppliedUserRouter.delete('/:id', authByValidationTable, deleteAppliedUser);

export default AppliedUserRouter;
