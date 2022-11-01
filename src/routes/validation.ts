import express from 'express';
import {
  getAllValidations,
  getValidationByClubId,
  createValidation,
  updateValidation,
  deleteValidation,
} from '../controllers/validation';
import {
  authByValidationTable,
  auth,
  authBySuperUser,
} from '../middlewares/auth';

const validationRouter = express.Router();

validationRouter.get('/', auth, authBySuperUser, getAllValidations);

validationRouter.get('/:clubId', authByValidationTable, getValidationByClubId);

validationRouter.post('/:clubId', createValidation);

validationRouter.patch('/:clubId', authByValidationTable, updateValidation);

validationRouter.delete('/:clubId', authByValidationTable, deleteValidation);

export default validationRouter;
