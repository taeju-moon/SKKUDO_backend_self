import { role, location } from './common';

export interface Column {
  key: string;
  valueType: string;
  value: any;
}

export interface RegisteredClub {
  id: string;
  clubId: string;
  role: role;
  moreColumns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  location: location;
  studentId: string;
  password: string;
  registeredClubs: RegisteredClub[];
  name: string;
  major: string;
  createdAt: Date;
  updatedAt: Date;
}
