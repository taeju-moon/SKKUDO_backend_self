export interface Applier {
  id: string;
  clubId: string;
  documentQuestions: string[]; //서류 질문
  interviewQuestions: string[]; //면접 질문
  appliedUsers: AppliedUser[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppliedUser {
  id: string;
  clubId: string;
  studentId: string;
  name: string;
  major: string;
  documentAnswers: string[]; //서류 답변
  documentScores: number[]; //서류 점수
  interviewAnswers: string[];
  pass: boolean; //합불여부
  createdAt: Date;
  updatedAt: Date;
}
