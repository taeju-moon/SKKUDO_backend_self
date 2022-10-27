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

validationRouter.get('/', getAllValidations);

validationRouter.get('/:clubId', getValidationByClubId);

validationRouter.post('/:clubId', createValidation);

validationRouter.patch('/:clubId', updateValidation);

validationRouter.delete('/:clubId', deleteValidation);

export default validationRouter;
