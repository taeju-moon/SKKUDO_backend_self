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
import { canRetrievePrivateNotices } from '../../middlewares/private';

const NoticeRouter = express.Router();

NoticeRouter.get('/', auth, authBySuperUser, getAllNotices);

NoticeRouter.get(
  '/club/:clubId',
  authByValidationTable,
  canRetrievePrivateNotices,
  getNoticesByClubId
);

NoticeRouter.get('/:id', getOneNotice);

NoticeRouter.post('/', authByValidationTable, createNotice);

NoticeRouter.patch('/:id', authByValidationTable, auth, updateNotice);

NoticeRouter.delete('/:id', authByValidationTable, deleteNotice);

export default NoticeRouter;
