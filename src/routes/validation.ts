import express from 'express';
import {
  getAllValidations,
  getValidationByClubId,
  createValidation,
  updateValidation,
  deleteValidation,
} from '../controllers/validation';
import { authByClub } from '../middlewares/auth';

const validationRouter = express.Router();

validationRouter.get('/', authByClub, getAllValidations);

validationRouter.get('/clubId', authByClub, getValidationByClubId);

validationRouter.post('/', authByClub, createValidation);

validationRouter.patch('/:clubId', authByClub, updateValidation);

validationRouter.delete('/:clubId', authByClub, deleteValidation);

export default validationRouter;
