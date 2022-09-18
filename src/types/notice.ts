import { User } from './user';

export interface NoticeTag {
  id: string;
  clubId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notice {
  id: string;
  writer: User;
  clubId: string; //동아리 ID
  title: string; //제목
  content: string; //내용
  tags: NoticeTag[]; //태그
  createdAt: Date;
  updatedAt: Date;
}
