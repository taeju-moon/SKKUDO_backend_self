import { Schema, model } from 'mongoose';
import { User as UserInterface } from '../../types/user';
import { Location } from '../../types/common';
import { registeredClubShcema } from './RegisteredClub';

const locations: Location[] = ['인사캠', '자과캠'];

const userSchema = new Schema<UserInterface>({
  studentId: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    message: '10자리의 학번을 정확하게 입력하세요.',
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    message: '비밀번호는 5자리 이상이어야 합니다.',
  },
  location: {
    type: String,
    required: true,
    enum: {
      values: locations,
      message: '인사캠 또는 자과캠이어야 합니다.',
    },
  },
  registeredClubs: {
    type: [registeredClubShcema],
  },
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

const User = model<UserInterface>('User', userSchema);

export { User, userSchema };
