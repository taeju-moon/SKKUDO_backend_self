import { Club as ClubInterface, RecruitType } from '../../types/club';
import { clubTypeSchema } from './ClubType';
import { Location } from '../../types/common';
import { Schema, model } from 'mongoose';
import { columnSchema } from '../common/Column';

const location: Location[] = ['인사캠', '자과캠'];
const recruitType: RecruitType[] = ['상시모집', '정규모집'];

const clubSchema = new Schema<ClubInterface>({
  name: {
    type: String,
    required: true,
    message: 'name is string and required',
  },
  location: {
    type: String,
    required: true,
    enum: {
      values: location,
      message: 'location은 인사캠 또는 자과캠만 올 수 있습니다.',
    },
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  type: {
    type: clubTypeSchema,
    required: true,
  },
  recruitType: {
    type: String,
    required: true,
    enum: {
      values: recruitType,
      message: '모집유형은 정규모집 또는 상시모집입니다.',
    },
  },
  userColumns: {
    type: [columnSchema],
  },
  recruitStart: {
    type: Date,
  },
  recruitEnd: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Club = model<ClubInterface>('Club', clubSchema);

clubSchema.virtual('clubId').get(function () {
  return this._id;
});

export { Club, clubSchema };
