import express from 'express';
import {
  getAllToDos,
  getOneToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} from '../../controllers/todo/ToDo';

const ToDoRouter = express.Router();

ToDoRouter.get('/', getAllToDos);

ToDoRouter.get('/:id', getOneToDo);

ToDoRouter.post('/', createToDo);

ToDoRouter.patch('/:id', updateToDo);

ToDoRouter.delete('/:id', deleteToDo);

export default ToDoRouter;
