import express from 'express';
import {
  getAllNotices,
  getOneNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../../controllers/notice/Notice';
import { authByValidationTable } from '../../middlewares/auth';

const NoticeRouter = express.Router();

NoticeRouter.get('/', getAllNotices);

NoticeRouter.get('/:id', authByValidationTable, getOneNotice);

NoticeRouter.post('/', authByValidationTable, createNotice);

NoticeRouter.patch('/:id', authByValidationTable, updateNotice);

NoticeRouter.delete('/:id', authByValidationTable, deleteNotice);

export default NoticeRouter;
