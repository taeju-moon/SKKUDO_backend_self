import express from 'express';
import {
  getAllMinuteTags,
  getOneMinuteTag,
  getMinuteTagsByClubId,
  createMinuteTag,
  deleteMinuteTag,
} from '../../controllers/minute/MinuteTag';
import {
  authByValidationTable,
  auth,
  authByClub,
  authBySuperUser,
} from '../../middlewares/auth';

const MinuteTagRouter = express.Router();

MinuteTagRouter.get('/', auth, authBySuperUser, getAllMinuteTags);

MinuteTagRouter.get('/:clubId', authByClub, getMinuteTagsByClubId);

MinuteTagRouter.get('/:id', getOneMinuteTag);

MinuteTagRouter.post('/', authByValidationTable, createMinuteTag);

MinuteTagRouter.delete('/:id', authByValidationTable, deleteMinuteTag);

export default MinuteTagRouter;
