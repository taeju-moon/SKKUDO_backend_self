import { Schema, model } from 'mongoose';
import { Applier as ApplierInterface } from '../../types/apply';
import { columnSchema } from '../common/Column';

const applierSchema = new Schema<ApplierInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Club',
  },
  documentQuestions: { type: [String] },
  interviewQuestions: { type: [String] },
  appliedUserColumns: { type: [columnSchema] },
  createdAt: Date,
  updatedAt: Date,
});

const Applier = model<ApplierInterface>('Applier', applierSchema);
export { Applier, applierSchema };
