import { Schema, model } from 'mongoose';
import { Notice as NoticeInterface } from '../../types/notice';
import { noticeTagSchema } from './NoticeTag';

const noticeSchema = new Schema<NoticeInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Club',
  },
  //writer
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [noticeTagSchema],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Notice = model<NoticeInterface>('Notice', noticeSchema);

export { Notice, noticeSchema };
