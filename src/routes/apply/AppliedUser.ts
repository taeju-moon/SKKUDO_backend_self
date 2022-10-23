import express from 'express';
import {
  getAllAppliedUsers,
  getAppliedUserByClubId,
  createAppliedUser,
  updateAppliedUser,
  deleteAppliedUser,
} from '../../controllers/apply/AppliedUser';

const AppliedUserRouter = express.Router();

AppliedUserRouter.get('/', getAllAppliedUsers);

AppliedUserRouter.get('/byClub/:clubId', getAppliedUserByClubId);

AppliedUserRouter.post('/', createAppliedUser);

AppliedUserRouter.patch('/:id', updateAppliedUser);

AppliedUserRouter.delete('/:id', deleteAppliedUser);

export default AppliedUserRouter;
