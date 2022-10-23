import { Controller } from '../../types/common';
import { NoticeTag } from '../../models/notice/NoticeTag';

export const getAllNoticeTags: Controller = (req, res) => {
  NoticeTag.find()
    .then((noticeTags) =>
      res.status(200).json({
        status: 'success',
        data: noticeTags,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getOneNoticeTag: Controller = (req, res) => {
  const id: string = req.params.id;
  NoticeTag.findById(id)
    .then((noticeTag) => {
      if (!noticeTag)
        res.status(404).json({ status: 'fail', error: 'noticeTag not found' });
      res.status(200).json({ status: 'succ ess', data: noticeTag });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createNoticeTag: Controller = (req, res) => {
  const noticeTag = new NoticeTag(req.body);
  noticeTag
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const deleteNoticeTag: Controller = (req, res) => {
  NoticeTag.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
