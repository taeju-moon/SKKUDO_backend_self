import { Schema, model, SchemaType } from 'mongoose';
import { studyTagSchema } from './StudyTag';
import { userSchema } from '../user/User';
import { Study as StudyInterface, DOTW } from '../../types/study';

const dotw: DOTW[] = ['월', '화', '수', '목', '금', '토', '일'];

const studySchema = new Schema<StudyInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  writer: {
    type: userSchema,
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
  week: {
    type: String,
    required: true,
    enum: {
        values: dotw,
        message: '월화수목금토일 중 하나만 들어갈 수 있습니다.',
      },
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  attendingUsers: {
    type: [String],
  },
  tags: {
    type: [studyTagSchema],
  },
  createdAt: Date,
  updatedAt: Date,
});

const Study = model<StudyInterface>('Study', studySchema);
export { studySchema, Study };
