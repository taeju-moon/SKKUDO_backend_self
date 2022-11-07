import { Controller } from '../../types/common';
import { MinuteTag } from '../../models/minute/MinuteTag';

export const getAllMinuteTags: Controller = (req, res) => {
  MinuteTag.find()
    .then((minuteTags) =>
      res.status(200).json({
        status: 'success',
        data: minuteTags,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getMinuteTagsByClubId: Controller = (req, res) => {
  const clubId: string = req.params.clubId;
  MinuteTag.find({ clubId })
    .then((tags) => {
      res.status(200).json({ status: 'success', data: tags });
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const getOneMinuteTag: Controller = (req, res) => {
  const id: string = req.params.id;
  MinuteTag.findById(id)
    .then((minuteTag) => {
      if (!minuteTag) {
        res.status(404).json({ status: 'fail', error: 'minuteTag not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: minuteTag });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createMinuteTag: Controller = (req, res) => {
  const minuteTag = new MinuteTag(req.body);
  minuteTag
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const deleteMinuteTag: Controller = (req, res) => {
  const id = req.params.id;
  MinuteTag.findOne({ _id: id })
    .then((data) => {
      if (!data)
        res.status(404).json({ status: 'fail', error: 'minutetag not found' });
      else
        data
          .remove()
          .then((data) => res.status(200).json({ status: 'success', data }))
          .catch((error) =>
            res.status(500).json({ status: 'fail', error: error.message })
          );
    })
    .catch((error) =>
      res.status(403).json({ status: 'fail', error: error.message })
    );
};
