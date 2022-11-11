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

AppliedUserRouter.post('/', createAppliedUser);

AppliedUserRouter.patch('/:id', auth, updateAppliedUser);

AppliedUserRouter.delete('/:id', authByValidationTable, deleteAppliedUser);

AppliedUserRouter.delete('/club/:clubId', deleteAppliedUsersByClubId);

export default AppliedUserRouter;
