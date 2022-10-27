import express from 'express';
import {
  getAllToDos,
  getToDosByClubId,
  getOneToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} from '../../controllers/todo/ToDo';
import { authByValidationTable } from '../../middlewares/auth';

const ToDoRouter = express.Router();

ToDoRouter.get('/', getAllToDos);

ToDoRouter.get('/club/:id', getToDosByClubId);

ToDoRouter.get('/:id', getOneToDo);

ToDoRouter.post('/', authByValidationTable, createToDo);

ToDoRouter.patch('/:id', authByValidationTable, updateToDo);

ToDoRouter.delete('/:id', authByValidationTable, deleteToDo);

export default ToDoRouter;
