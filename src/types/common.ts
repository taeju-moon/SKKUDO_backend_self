import { Types } from 'mongoose';

export type Role = '회장단' | '운영진' | '부원';

export type Location = '인사캠' | '자과캠';

export interface Column {
  _id: Types.ObjectId;
  key: string;
  valueType: string;
  value: any;
}
