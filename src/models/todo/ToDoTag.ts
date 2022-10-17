import { Schema, model } from 'mongoose';
import { ToDoTag as ToDoTagInterface } from '../../types/todo';

const toDoTagSchema = new Schema<ToDoTagInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});
const ToDoTag = model<ToDoTagInterface>('ToDoTag', toDoTagSchema);
export { ToDoTag, toDoTagSchema };
