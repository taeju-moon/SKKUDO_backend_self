import { Schema, model } from 'mongoose';
import { NoticeTag as NoticeTagInterface } from '../../types/notice';
import { NoticeTag } from '../../types/notice';

const noticeTagSchema = new Schema<NoticeTagInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Club',
  },
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

const NoticeTag = model<NoticeTagInterface>('NoticeTag', noticeTagSchema);

export { NoticeTag, noticeTagSchema };
