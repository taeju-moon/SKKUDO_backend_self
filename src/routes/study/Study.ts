import express from 'express';
import {
  getAllStudies,
  getStudiesByClubId,
  getOneStudy,
  createStudy,
  updateStudy,
  deleteStudy,
} from '../../controllers/study/Study';
import { authByValidationTable } from '../../middlewares/auth';

const StudyRouter = express.Router();

StudyRouter.get('/', getAllStudies);

StudyRouter.get('/club/:id', getStudiesByClubId);

StudyRouter.get('/:id', getOneStudy);

StudyRouter.post('/', authByValidationTable, createStudy);

StudyRouter.patch('/:id', authByValidationTable, updateStudy);

StudyRouter.delete('/:id', authByValidationTable, deleteStudy);

export default StudyRouter;
