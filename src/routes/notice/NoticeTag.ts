import express from 'express';
import {
  getAllNoticeTags,
  getOneNoticeTag,
  getNoticeTagsByClubId,
  createNoticeTag,
  deleteNoticeTag,
} from '../../controllers/notice/NoticeTag';
import {
  authByValidationTable,
  auth,
  authByClub,
  authBySuperUser,
} from '../../middlewares/auth';

const NoticeTagRouter = express.Router();

NoticeTagRouter.get('/', auth, authBySuperUser, getAllNoticeTags);

NoticeTagRouter.get('/:clubId', authByClub, getNoticeTagsByClubId);

NoticeTagRouter.get('/:id', getOneNoticeTag);

NoticeTagRouter.post('/', authByValidationTable, createNoticeTag);

NoticeTagRouter.delete('/:id', authByValidationTable, deleteNoticeTag);

export default NoticeTagRouter;
