import express from 'express';
import {
  getAllClubTypes,
  getOneClubType,
  createClubType,
  deleteClubType,
} from '../../controllers/club/ClubType';

const ClubTypeRouter = express.Router();

ClubTypeRouter.get('/', getAllClubTypes);

ClubTypeRouter.get('/:id', getOneClubType);

ClubTypeRouter.post('/', createClubType);

ClubTypeRouter.delete('/:id', deleteClubType);

export default ClubTypeRouter;
