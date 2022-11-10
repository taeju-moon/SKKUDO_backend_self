import express from 'express';
import {
  getAllClubs,
  getOneClub,
  createClub,
  updateClub,
  acceptClub,
  deleteClub,
  addClubUserColumn,
  updateClubUserColumn,
  deleteClubUserColumn,
} from '../../controllers/club/Club';
import {
  authByValidationTable,
  auth,
  authBySuperUser,
} from '../../middlewares/auth';
import { refineUsers } from '../../middlewares/refineUser';

const ClubRouter = express.Router();

ClubRouter.get('/', getAllClubs);

ClubRouter.get('/:clubId', getOneClub);

ClubRouter.post('/', createClub);

ClubRouter.patch('/:clubId', authByValidationTable, updateClub);

ClubRouter.patch('/accept/:clubId', auth, authBySuperUser, acceptClub);

ClubRouter.delete('/:clubId', authByValidationTable, deleteClub);

ClubRouter.post('/userColumn/:clubId', refineUsers, addClubUserColumn);

ClubRouter.patch('/userColumn/:clubId', refineUsers, updateClubUserColumn);

ClubRouter.delete('/userColumn/:clubId', refineUsers, deleteClubUserColumn);

export default ClubRouter;
