import { Controller } from '../../types/common';
import { Study } from '../../models/study/Study';
import { StudyTag } from '../../models/study/StudyTag';

export const getAllStudies: Controller = (req, res) => {
    Study.find()
    .then((studies) =>
      res.status(200).json({
        status: 'success',
        data: studies,
      })
    )
    .catch((error) =>
      res.status(500).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const getStudiesByClubId: Controller = (req, res) => {
    Study.find({ clubId: req.params.id })
    .then((studies) => {
      if (!studies) {
        res.status(404).json({ status: 'fail', error: 'studies not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: studies });
      }
    })
    .catch((error) =>
      res.status(500).json({ status: 'fail', error: error.message })
    );
};

export const getOneStudy: Controller = (req, res) => {
  const id: string = req.params.id;
  Study.findById(id)
    .then((study) => {
      if (!study)  {
        res.status(404).json({ status: 'fail', error: 'study not found' });
      }
      else {
        res.status(200).json({ status: 'success', data: study });
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: 'fail',
        error: error.message,
      });
    });
};

export const createStudy: Controller = (req, res) => {
  const study = new Study(req.body);
  StudyTag.find().then((tags) => {
    let k: number = 0;
    for (let i = 0; i < study.tags.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (
          study.tags[i].clubId.toString() === tags[j].clubId.toString() &&
          study.tags[i].name === tags[j].name
        ) {
          study.tags[i]._id = tags[j]._id;
          k++;
          break;
        }
      }
      if (i === k) {
        return res.status(404).json({
          status: 'fail',
          error: {
            message: '존재하지 않는 스터디 태그입니다.',
            data: study.tags[i],
          },
        });
      }
    }
    if (k === study.tags.length) {
      study
        .save()
        .then((data) => res.status(200).json({ status: 'success', data }))
        .catch((error) =>
          res.status(400).json({ status: 'fail', error: error.message })
        );
    }
  });
};

export const updateStudy: Controller = (req, res) => {
  const id: string = req.params.id;
  Study.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => {
      if (!data) {
        res.status(400).json({ status: 'fail', error: 'Study not found' });
      }
      else {
        res.status(200).json({
        status: 'success',
        data,
      })};
    })
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error: error.message,
      })
    );
};

export const deleteStudy: Controller = (req, res) => {
    Study.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).json({ status: 'success', data }))
    .catch((error) =>
      res.status(400).json({ status: 'fail', error: error.message })
    );
};
