import { Schema, model } from 'mongoose';
import { Minute as MinuteInterface } from '../../types/minute';

const minuteSchema = new Schema<MinuteInterface>({
  clubId: {
    type: String,
    required: true,
    ref: 'Club',
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  minuteTags: {
    type: [String],
    default: [],
  },
  createdAt: Date,
  updatedAt: Date,
});

const Minute = model<MinuteInterface>('Minute', minuteSchema);

export { Minute, minuteSchema };
