import { Controller } from '../../types/common';
import { Notice } from '../../models/notice/Notice';

export const getAllNotices: Controller = (req, res) => {
  Notice.find()
    .then((notices) =>
      res.status(200).json({
        status: 'success',
        data: notices,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getNoticesByClubId: Controller = (req, res) => {
  Notice.find({ clubId: req.params.id })
    .then((notices) => {
      if (!notices)
        res.status(404).json({ status: 'fail', error: 'notices not found' });
      res.status(200).json({ status: 'success', data: notices });
    })
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
    );
};

export const getOneNotice: Controller = (req, res) => {
  const id: string = req.params.id;
  Notice.findById(id)
    .then((notice) => {
      if (!notice)
        res.status(404).json({ status: 'fail', error: 'notice not found' });
      res.status(200).json({ status: 'success', data: notice });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createNotice: Controller = (req, res) => {
  const notice = new Notice(req.body);
  notice
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const updateNotice: Controller = (req, res) => {
  const id: string = req.params.id;
  Notice.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data)
        res.status(400).json({ status: 'fail', error: 'Notice not found' });
      res.status(200).json({
        status: 'success',
        data,
      });
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const deleteNotice: Controller = (req, res) => {
  Notice.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
