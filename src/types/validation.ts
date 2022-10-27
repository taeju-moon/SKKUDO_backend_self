import { Role } from './common';
import { Types } from 'mongoose';

export interface Validation {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  noticeRead: Role;
  noticeWrite: Role;
  userRead: Role;
  userWrite: Role;
  userColumnWrite: Role;
  todoRead: Role;
  todoWrite: Role;
  applyRead: Role;
  applyWrite: Role;
  validationRead: Role;
  validationWrite: '회장';
  clubRead: Role;
  clubWrite: '회장';
  tagWrite: Role;
  createdAt: Date;
  updatedAt: Date;
}
