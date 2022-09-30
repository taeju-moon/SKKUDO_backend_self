import express from 'express';
const ClubTypeRouter = express.Router();
import {
  getAllClubTypes,
  getOneClubType,
  createClubType,
  deleteClubType,
} from '../../controllers/club/ClubType';

ClubTypeRouter.get('/', getAllClubTypes);

ClubTypeRouter.get('/:id', getOneClubType);

ClubTypeRouter.post('/', createClubType);

ClubTypeRouter.delete('/:id', deleteClubType);

export default ClubTypeRouter;
