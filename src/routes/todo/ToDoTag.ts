import express from 'express';
import {
  getAllToDoTags,
  getToDoTagsByClubId,
  getOneToDoTag,
  createToDoTag,
  deleteToDoTag,
} from '../../controllers/todo/ToDoTag';
import { auth, authByValidationTable } from '../../middlewares/auth';

const ToDoTagRouter = express.Router();

ToDoTagRouter.get('/', getAllToDoTags);

ToDoTagRouter.get('/club/:clubId', auth, getToDoTagsByClubId);

ToDoTagRouter.get('/:id', auth, getOneToDoTag);

ToDoTagRouter.post('/', authByValidationTable, createToDoTag);

ToDoTagRouter.delete('/:id', authByValidationTable, deleteToDoTag);

export default ToDoTagRouter;
