import express from 'express';
import {
  getAllStudyTags,
  getOneStudyTag,
  createStudyTag,
  deleteStudyTag,
} from '../../controllers/study/StudyTag';

const StudyTagRouter = express.Router();

StudyTagRouter.get('/', getAllStudyTags);

StudyTagRouter.get('/:id', getOneStudyTag);

StudyTagRouter.post('/', createStudyTag);

StudyTagRouter.delete('/:id', deleteStudyTag);

export default StudyTagRouter;
