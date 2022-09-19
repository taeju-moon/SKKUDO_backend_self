import { Role } from './common';

export interface Validation {
  id: string;
  clubId: string;
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
  validationWrite: '회장단';
  clubRead: Role;
  clubWrite: '회장단';
  createdAt: Date;
  updatedAt: Date;
}
