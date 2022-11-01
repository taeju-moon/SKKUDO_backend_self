import express from 'express';
import {
  getAllToDoTags,
  getOneToDoTag,
  createToDoTag,
  deleteToDoTag,
} from '../../controllers/todo/ToDoTag';
import { authByValidationTable } from '../../middlewares/auth';

const ToDoTagRouter = express.Router();

ToDoTagRouter.get('/', getAllToDoTags);

ToDoTagRouter.get('/:id', authByValidationTable, getOneToDoTag);

ToDoTagRouter.post('/', authByValidationTable, createToDoTag);

ToDoTagRouter.delete('/:id', authByValidationTable, deleteToDoTag);

export default ToDoTagRouter;
