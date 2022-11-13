import { Budget as BudgetInterface } from '../../types/budget';
import { Schema, model } from 'mongoose';
import { BudgetRow as BudgetRowInterface } from '../../types/budget';

const budgetRowSchema = new Schema<BudgetRowInterface>({
  date: Date,
  income: String,
  expense: String,
  whom: String,
  content: String,
  balance: String,
  note: String,
  account: String,
});

const budgetSchema = new Schema<BudgetInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, required: true },
  rows: [
    {
      type: budgetRowSchema,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

const Budget = model<BudgetInterface>('Budget', budgetSchema);
export { budgetSchema, Budget };

const BudgetRow = model<BudgetRowInterface>('BudgetRow', budgetRowSchema);
export { budgetRowSchema, BudgetRow };
