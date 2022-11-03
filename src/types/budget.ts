import { Types } from 'mongoose';

export interface Budget {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  name: string;
  date: string[];
  income: string[];   //수입
  expense: string[];  //지출
  whom: string[];     //Who/m
  content: string[];  //내용
  balance: string[];  //잔액
  note: string[];     //비고
  account: string[];  //사용계좌
  createdAt: Date;
  updatedAt: Date;
}
