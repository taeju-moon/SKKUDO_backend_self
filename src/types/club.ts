import { Location } from './common';
import { Types } from 'mongoose';

export type RecruitType = '정규모집' | '상시모집';

export interface Club {
  _id: Types.ObjectId;
  name: string;
  location: Location;
  type: ClubType;
  //description
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
