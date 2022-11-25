import express from 'express';
import {
  getAllToDos,
  getToDosByClubId,
  getOneToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} from '../../controllers/todo/ToDo';
import {
  authByValidationTable,
  auth,
  authBySuperUser,
} from '../../middlewares/auth';
import { canRetrievePrivateToDos } from '../../middlewares/private';

const ToDoRouter = express.Router();

ToDoRouter.get('/', auth, authBySuperUser, getAllToDos);

ToDoRouter.get(
  '/club/:clubId',
  authByValidationTable,
  canRetrievePrivateToDos,
  getToDosByClubId
);

ToDoRouter.get('/:id', getOneToDo);

ToDoRouter.post('/', authByValidationTable, auth, createToDo);

ToDoRouter.patch('/:id', authByValidationTable, auth, updateToDo);

ToDoRouter.delete('/:id', authByValidationTable, deleteToDo);

export default ToDoRouter;
