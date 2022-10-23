import express from 'express';
import {
  getAllToDoTags,
  getOneToDoTag,
  createToDoTag,
  deleteToDoTag,
} from '../../controllers/todo/ToDoTag';

const ToDoTagRouter = express.Router();

ToDoTagRouter.get('/', getAllToDoTags);

ToDoTagRouter.get('/:id', getOneToDoTag);

ToDoTagRouter.post('/', createToDoTag);

ToDoTagRouter.delete('/:id', deleteToDoTag);

export default ToDoTagRouter;
