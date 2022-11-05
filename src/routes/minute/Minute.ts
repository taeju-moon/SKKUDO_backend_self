import express from 'express';
import {
  getAllMinutes,
  getMinutesByClubId,
  getOneMinute,
  createMinute,
  updateMinute,
  deleteMinute,
} from '../../controllers/minute/Minute';
import {
  authByValidationTable,
  auth,
  authBySuperUser,
} from '../../middlewares/auth';

const MinuteRouter = express.Router();

MinuteRouter.get('/', auth, authBySuperUser, getAllMinutes);

MinuteRouter.get('/club/:clubId', authByValidationTable, getMinutesByClubId);

MinuteRouter.get('/:id', getOneMinute);

MinuteRouter.post('/', createMinute);

MinuteRouter.patch('/:id', authByValidationTable, auth, updateMinute);

MinuteRouter.delete('/:id', authByValidationTable, deleteMinute);

export default MinuteRouter;
