import { Types } from 'mongoose';

export interface MinuteTag {
  _id: Types.ObjectId;
  clubId: String;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Minute {
  _id: Types.ObjectId;
  clubId: String; //동아리 ID
  date: Date;
  title: string; //제목
  content: string; //내용
  minuteTags: String[]; //태그
  createdAt: Date;
  updatedAt: Date;
}
