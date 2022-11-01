import express from 'express';
import {
  getAllAppliedUsers,
  getAppliedUsersByClubId,
  createAppliedUser,
  updateAppliedUser,
  deleteAppliedUser,
} from '../../controllers/apply/AppliedUser';
import { authByValidationTable } from '../../middlewares/auth';

const AppliedUserRouter = express.Router();

AppliedUserRouter.get('/', getAllAppliedUsers);

AppliedUserRouter.get('/byClub/:clubId', getAppliedUsersByClubId);

AppliedUserRouter.post('/', createAppliedUser);

AppliedUserRouter.patch('/:id', updateAppliedUser);

AppliedUserRouter.delete('/:id', deleteAppliedUser);

export default AppliedUserRouter;
