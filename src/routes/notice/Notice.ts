import express from 'express';
import {
  getAllNotices,
  getOneNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../../controllers/notice/Notice';

const NoticeRouter = express.Router();

NoticeRouter.get('/', getAllNotices);

NoticeRouter.get('/:id', getOneNotice);

NoticeRouter.post('/', createNotice);

NoticeRouter.patch('/:id', updateNotice);

NoticeRouter.delete('/:id', deleteNotice);

export default NoticeRouter;
