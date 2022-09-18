import { role } from './common';

export interface Validation {
  id: string;
  clubId: string;
  noticeRead: role;
  noticeWrite: role;
  userRead: role;
  userWrite: role;
  userColumnWrite: role;
  todoRead: role;
  todoWrite: role;
  applyRead: role;
  applyWrite: role;
  validationRead: role;
  validationWrite: '회장단';
  clubRead: role;
  clubWrite: '회장단';
  createdAt: Date;
  updatedAt: Date;
}
