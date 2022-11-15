import express from 'express';
import {
  getAllBudgets,
  getBudgetByClubId,
  getOneBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} from '../../controllers/budget/Budget';
import {
  auth,
  authBySuperUser,
  authByValidationTable,
} from '../../middlewares/auth';

const BudgetRouter = express.Router();

BudgetRouter.get('/', auth, authBySuperUser, getAllBudgets);

BudgetRouter.get('/club/:clubId', authByValidationTable, getBudgetByClubId);

BudgetRouter.get('/:id/:clubId', authByValidationTable, getOneBudget);

BudgetRouter.post('/', authByValidationTable, createBudget);

BudgetRouter.patch('/:id', authByValidationTable, updateBudget);

BudgetRouter.delete('/:id', authByValidationTable, deleteBudget);

export default BudgetRouter;
