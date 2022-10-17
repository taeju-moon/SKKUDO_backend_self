import { Schema, model } from 'mongoose';
import { ToDoTag as ToDoTagInterface } from '../../types/todo';
import { ToDo as ToDoInterface } from '../../types/todo';
import { ToDo } from './ToDo';

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

toDoTagSchema.pre('remove', function (next) {
  const toDoTag = this;
  ToDo.find({ clubId: toDoTag.clubId })
    .then((todos: ToDoInterface[]) => {
      const filtered = todos.filter((todo) => todo.tags.includes(toDoTag));
      if (filtered.length > 0)
        next(Error('해당 태그를 사용하는 일정이 있습니다.'));
      else next();
    })
    .catch((error) => next(Error(error)));
});

const ToDoTag = model<ToDoTagInterface>('ToDoTag', toDoTagSchema);
export { ToDoTag, toDoTagSchema };
