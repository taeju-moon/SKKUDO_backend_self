import { User } from './user';
import { Types } from 'mongoose';

export interface NoticeTag {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notice {
  _id: Types.ObjectId;
  writer: User;
  clubId: Types.ObjectId; //동아리 ID
  title: string; //제목
  content: string; //내용
  tags: NoticeTag[]; //태그
  createdAt: Date;
  updatedAt: Date;
}
