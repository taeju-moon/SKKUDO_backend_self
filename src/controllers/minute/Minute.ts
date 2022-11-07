import { Controller } from '../../types/common';
import { Minute } from '../../models/minute/Minute';

export const getAllMinutes: Controller = (req, res) => {
    Minute.find()
    .then((minutes) =>
      res.status(200).json({
        status: 'success',
        data: minutes,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getMinutesByClubId: Controller = (req, res) => {
    Minute.find({ clubId: req.params.clubId })
    .then((minutes) => {
      if (!minutes) {
        res.status(404).json({ status: 'fail', error: 'minutes not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: minutes });
      }
    })
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
    );
};

export const getOneMinute: Controller = (req, res) => {
  const id: string = req.params.id;
  Minute.findById(id)
    .then((minute) => {
      if (!minute) {
        res.status(404).json({ status: 'fail', error: 'minute not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: minute });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createMinute: Controller = (req, res) => {
  const minute = new Minute(req.body);
  minute
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const updateMinute: Controller = (req, res) => {
  const id: string = req.params.id;
  Minute.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).json({ status: 'fail', error: 'Minute not found' });
      }
      else {
        res.status(200).json({
          status: 'success',
          data,
        });
      }
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const deleteMinute: Controller = (req, res) => {
  Minute.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
