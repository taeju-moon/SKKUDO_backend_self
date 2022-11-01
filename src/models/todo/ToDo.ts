import { Schema, model, SchemaType } from 'mongoose';
import { ToDo as ToDoInterface } from '../../types/todo';
import { toDoTagSchema } from './ToDoTag';
import { userSchema } from '../user/User';

const toDoSchema = new Schema<ToDoInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: Date,
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  attendingUsers: {
    type: [String],
  },
  tags: {
    type: [toDoTagSchema],
  },
  createdAt: Date,
  updatedAt: Date,
});

const ToDo = model<ToDoInterface>('ToDo', toDoSchema);
export { toDoSchema, ToDo };
