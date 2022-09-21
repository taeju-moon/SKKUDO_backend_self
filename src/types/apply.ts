import { Types } from 'mongoose';
import { Column } from './common';

export interface Applier {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  documentQuestions: string[]; //서류 질문
  interviewQuestions: string[]; //면접 질문
  appliedUserColumns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppliedUser {
  _id: Types.ObjectId;
  clubId: Types.ObjectId;
  studentId: string;
  name: string;
  major: string;
  moreColumns: {
    column: Column;
    value: String;
  }[];
  documentAnswers: string[]; //서류 답변
  documentScores: number[]; //서류 점수
  interviewAnswers: string[]; //면접 답변
  interviewScores: number[]; //면접 점수
  pass: boolean; //합불여부
  createdAt: Date;
  updatedAt: Date;
}
