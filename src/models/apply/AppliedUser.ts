import { Schema, model } from 'mongoose';
import { AppliedUser as AppliedUserInterface } from '../../types/apply';
import { columnSchema } from '../common/Column';

const appliedUserSchema = new Schema<AppliedUserInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
    required: true,
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  moreColumns: {
    type: [
      {
        column: columnSchema,
        value: String,
      },
    ],
  },
  documentAnswers: {
    type: [String],
  },
  documentScores: {
    type: [Number],
  },
  interviewScores: {
    type: [Number],
  },
  pass: {
    type: Boolean,
    defualt: false,
  },
  createdAt: Date,
  updatedAt: Date,
});

const AppliedUser = model<AppliedUserInterface>(
  'AppliedUser',
  appliedUserSchema
);

export { AppliedUser, appliedUserSchema };
