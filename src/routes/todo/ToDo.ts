import express from 'express';
import {
  getAllToDos,
  getToDosByClubId,
  getOneToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} from '../../controllers/todo/ToDo';
import { authByValidationTable, auth } from '../../middlewares/auth';

const ToDoRouter = express.Router();

ToDoRouter.get('/', getAllToDos);

ToDoRouter.get('/club/:id', authByValidationTable, getToDosByClubId);

ToDoRouter.get('/:id', getOneToDo);

ToDoRouter.post('/', authByValidationTable, auth, createToDo);

ToDoRouter.patch('/:id', authByValidationTable, auth, updateToDo);

ToDoRouter.delete('/:id', authByValidationTable, deleteToDo);

export default ToDoRouter;
