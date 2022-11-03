import express from 'express';
import {
  getAllNotices,
  getNoticesByClubId,
  getOneNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../../controllers/notice/Notice';
import {
  authByValidationTable,
  auth,
  authBySuperUser,
} from '../../middlewares/auth';

const NoticeRouter = express.Router();

NoticeRouter.get('/', auth, authBySuperUser, getAllNotices);

NoticeRouter.get('/club/:id', authByValidationTable, getNoticesByClubId);

NoticeRouter.get('/:id', authByValidationTable, getOneNotice);

NoticeRouter.post('/', authByValidationTable, auth, createNotice);

NoticeRouter.patch('/:id', authByValidationTable, auth, updateNotice);

NoticeRouter.delete('/:id', authByValidationTable, deleteNotice);

export default NoticeRouter;
