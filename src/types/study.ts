import { User } from './user';
import { Types } from 'mongoose';

export type DOTW = '월' | '화' | '수' | '목' | '금' | '토' | '일';

export interface StudyTag {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Study {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  writer: User;
  title: string;
  content: string;
  week: DOTW;
  startTime: Date;
  endTime: Date;
  location: string;
  attendingUsers: string[]; //유저들의 studentId의 배열
  tags: StudyTag[];
  createdAt: Date;
  updatedAt: Date;
}
