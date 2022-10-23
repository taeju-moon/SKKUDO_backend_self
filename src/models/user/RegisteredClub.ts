import { Schema, model } from 'mongoose';
import { columnSchema } from '../common/Column';
import { RegisteredClub as RegisteredClubInterface } from '../../types/user';
import { Role } from '../../types/common';

const role: Role[] = ['회장', '부회장', '운영진', '부원'];

const registeredClubShcema = new Schema<RegisteredClubInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  clubName: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: role,
      message: '권한은 회장, 부회장, 운영진 또는 부원이어야 합니다.',
    },
  },
  moreColumns: {
    type: [{ column: columnSchema, value: String }],
    default: [],
  },
  createdAt: Date,
  updatedAt: Date,
});

const RegisteredClub = model<RegisteredClubInterface>(
  'RegisteredClub',
  registeredClubShcema
);

export { RegisteredClub, registeredClubShcema };
