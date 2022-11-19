import { Location, Column } from './common';
import { User } from './user';
import { Types } from 'mongoose';

export type RecruitType = '정규모집' | '상시모집';

export interface Club {
  _id: Types.ObjectId;
  name: string;
  initializer: User;
  location: Location;
  accepted: boolean;
  type: ClubType;
  userColumns: Column[];
  //description
  image: string; //image가 저장된 경로
  recruitType: RecruitType;
  recruitStart: Date | null; //모집 시작일
  recruitEnd: Date | null; //모집 종료일
  createdAt: Date;
  updatedAt: Date;
}

export interface ClubType {
  _id: Types.ObjectId;
  name: string; //프로그래밍, 경영
  createdAt: Date;
  updatedAt: Date;
}
