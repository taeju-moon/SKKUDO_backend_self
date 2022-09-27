import { Types } from 'mongoose';

export type Role = '회장' | '부회장' | '운영진' | '부원';

export type Location = '인사캠' | '자과캠';

export type ValueType = 'string' | 'number' | 'boolean';

export interface Column {
  _id: Types.ObjectId;
  key: string;
  valueType: ValueType;
}
