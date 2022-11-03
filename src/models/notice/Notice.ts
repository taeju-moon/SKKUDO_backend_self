import { Schema, model } from 'mongoose';
import { Notice as NoticeInterface } from '../../types/notice';
import { noticeTagSchema } from './NoticeTag';

const noticeSchema = new Schema<NoticeInterface>({
  clubId: {
    type: String,
    required: true,
    ref: 'Club',
  },
  writer: {
    type: String,
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
  noticeTags: {
    type: [noticeTagSchema],
    default: [],
  },
  createdAt: Date,
  updatedAt: Date,
});

const Notice = model<NoticeInterface>('Notice', noticeSchema);

export { Notice, noticeSchema };
