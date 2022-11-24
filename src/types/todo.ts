import { User } from './user';
import { Types } from 'mongoose';

export interface ToDoTag {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToDo {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  writer: string;
  title: string;
  private: boolean;
  content: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  attendingUsers: string[]; //유저들의 studentId의 배열
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
