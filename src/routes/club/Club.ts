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
import { isApplierExist } from '../../middlewares/club';

const ClubRouter = express.Router();

ClubRouter.get('/', getAllClubs);

ClubRouter.get('/:clubId', getOneClub);

ClubRouter.post('/', createClub);

ClubRouter.patch('/:clubId', isApplierExist, authByValidationTable, updateClub);

ClubRouter.patch(
  '/accept/:clubId',
  isApplierExist,
  auth,
  authBySuperUser,
  acceptClub
);

ClubRouter.delete(
  '/:clubId',
  isApplierExist,
  authByValidationTable,
  deleteClub
);

ClubRouter.post(
  '/userColumn/:clubId',
  authByValidationTable,
  refineUsers,
  isApplierExist,
  addClubUserColumn
);

ClubRouter.patch(
  '/userColumn/:clubId',
  authByValidationTable,
  refineUsers,
  isApplierExist,
  updateClubUserColumn
);

ClubRouter.delete(
  '/userColumn/:clubId',
  authByValidationTable,
  refineUsers,
  isApplierExist,
  deleteClubUserColumn
);

export default ClubRouter;
