import { Role, Location, Column } from './common';

export interface RegisteredClub {
  id: string;
  clubId: string;
  role: Role;
  moreColumns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  location: Location;
  studentId: string;
  password: string;
  registeredClubs: RegisteredClub[];
  name: string;
  major: string;
  createdAt: Date;
  updatedAt: Date;
}
