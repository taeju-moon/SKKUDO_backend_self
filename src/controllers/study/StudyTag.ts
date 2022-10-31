import { Controller } from '../../types/common';
import { StudyTag } from '../../models/study/StudyTag';

export const getAllStudyTags: Controller = (req, res) => {
    StudyTag.find()
    .then((studyTags) =>
      res.status(200).json({
        status: 'success',
        data: studyTags,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getOneStudyTag: Controller = (req, res) => {
  const id: string = req.params.id;
  StudyTag.findById(id)
    .then((studyTag) => {
      if (!studyTag) {
        res.status(404).json({ status: 'fail', error: 'studyTag not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: studyTag });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createStudyTag: Controller = (req, res) => {
  const studyTag = new StudyTag(req.body);
  studyTag
    .save()
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};

export const deleteStudyTag: Controller = (req, res) => {
  const id: string = req.params.id;
  StudyTag.findOne({ _id: id })
    .then((data) => {
      if (!data)
        res.status(404).json({ status: 'fail', error: 'studyTag not found' });
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
