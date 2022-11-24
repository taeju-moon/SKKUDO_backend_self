import { Schema, model, SchemaType } from 'mongoose';
import {
  ToDo as ToDoInterface,
  ToDoTag as ToDoTagInterface,
} from '../../types/todo';
import { ToDoTag } from './ToDoTag';

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
  private: {
    type: Boolean,
    default: false,
  },
  endTime: {
    type: Date,
    required: true,
  },
  attendingUsers: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  createdAt: Date,
  updatedAt: Date,
});

toDoSchema.pre('save', function (next) {
  const todo = this;
  let failureTag: string | null = null;
  ToDoTag.find({ clubId: todo.clubId }).then((tags: ToDoTagInterface[]) => {
    todo.tags.forEach((usingTag: string) => {
      let found: boolean = false;
      tags.forEach((tag) => {
        if (tag.name === usingTag) found = true;
      });
      if (!found) {
        failureTag = usingTag;
        return;
      }
    });
    if (failureTag)
      next(
        Error(`${failureTag}는 해당 동아리 내 존재하지 않는 일정 태그입니다.`)
      );
    else next();
  });
});

const ToDo = model<ToDoInterface>('ToDo', toDoSchema);
export { toDoSchema, ToDo };
