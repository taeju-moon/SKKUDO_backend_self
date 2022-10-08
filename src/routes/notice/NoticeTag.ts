import express from 'express';
import {
  getAllNoticeTags,
  getOneNoticeTag,
  createNoticeTag,
  deleteNoticeTag,
} from '../../controllers/notice/NoticeTag';

const NoticeTagRouter = express.Router();

NoticeTagRouter.get('/', getAllNoticeTags);

NoticeTagRouter.get('/:id', getOneNoticeTag);

NoticeTagRouter.post('/', createNoticeTag);

NoticeTagRouter.delete('/:id', deleteNoticeTag);

export default NoticeTagRouter;
