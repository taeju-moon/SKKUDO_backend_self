import { Validation } from '../models/validation/validation';
import { Controller } from '../types/common';
import { Types } from 'mongoose';

export const getAllValidations: Controller = (req, res) => {
  Validation.find()
    .then((data) =>
      res.status(200).json({
        status: 'success',
        data,
      })
    )
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
    );
};

export const getValidationByClubId: Controller = (req, res) => {
  Validation.find({ clubId: req.params.clubId })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .json({ status: 'fail', data: '해당 동아리를 찾을 수 없습니다' });
      res.status(200).json({ status: 'success', data });
    })
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
    );
};

export const createValidation: Controller = (req, res) => {
  Validation.findOne({ clubId: req.params.clubId })
    .then((data) => {
      if (data)
        res.status(403).json({
          status: 'fail',
          error: '해당 동아리의 인증 테이블이 이미 존재합니다.',
        });
    })
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
  const validation = new Validation(req.body);
  validation.clubId = new Types.ObjectId(req.params.clubId);
  validation
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const updateValidation: Controller = (req, res) => {
  const clubId = req.params.clubId;
  Validation.findOneAndUpdate({ clubId: clubId }, req.body)
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

export const deleteValidation: Controller = (req, res) => {
  Validation.findOneAndDelete({ clubId: req.params.clubId })
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
