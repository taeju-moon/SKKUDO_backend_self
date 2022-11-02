import { Budget as BudgetInterface } from '../../types/budget';
import { Schema, model } from 'mongoose';
  
  const budgetSchema = new Schema<BudgetInterface>({
    clubId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: String,
    date: {
        type: [String],
        default: [],
    },
    income: {
        type: [String],
        default: [],
    },
    expense: {
        type: [String],
        default: [],
    },
    whom: {
        type: [String],
        default: [],
    },
    content: {
        type: [String],
        default: [],
    },
    balance: {
        type: [String],
        default: [],
    },
    note: {
        type: [String],
        default: [],
    },
    account: {
        type: [String],
        default: [],
    },
    createdAt: Date,
    updatedAt: Date
  })

const Budget = model<BudgetInterface>('Budget', budgetSchema);
export { budgetSchema, Budget };
  