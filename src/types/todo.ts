import { User } from './user';

export interface ToDoTag {
  id: string;
  clubId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToDo {
  id: string;
  clubId: string;
  writer: User;
  title: string;
  content: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  attendingUsers: User[];
  tags: ToDoTag;
  createdAt: Date;
  updatedAt: Date;
}
