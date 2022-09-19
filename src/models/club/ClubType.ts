import { Schema, model } from 'mongoose';
import { ClubType as ClubTypeInterface } from '../../types/club';

const clubTypeSchema = new Schema<ClubTypeInterface>({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const ClubType = model<ClubTypeInterface>('ClubType', clubTypeSchema);

export { ClubType, clubTypeSchema };
