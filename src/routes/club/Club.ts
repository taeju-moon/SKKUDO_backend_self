import express from 'express';
import {
  getAllClubs,
  getOneClub,
  createClub,
  updateClub,
  acceptClub,
  deleteClub,
} from '../../controllers/club/Club';

const ClubRouter = express.Router();

ClubRouter.get('/', getAllClubs);

ClubRouter.get('/:id', getOneClub);

ClubRouter.post('/', createClub);

ClubRouter.patch('/:id', updateClub);

ClubRouter.patch('/accept/:id', acceptClub);

ClubRouter.delete('/:id', deleteClub);

export default ClubRouter;
