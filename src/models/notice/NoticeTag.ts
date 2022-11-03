import { Schema, model, Types } from 'mongoose';
import { NoticeTag as NoticeTagInterface } from '../../types/notice';
import { NoticeTag } from '../../types/notice';
import { Notice as NoticeInterface } from '../../types/notice';
import { Notice } from './Notice';

const noticeTagSchema = new Schema<NoticeTagInterface>({
  clubId: {
    type: String,
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

noticeTagSchema.pre('remove', function (next) {
  const noticeTag = this;
  Notice.find({ clubId: noticeTag.clubId })
    .then((notices: NoticeInterface[]) => {
      let usingTag: NoticeTagInterface | null = null;
      notices.forEach((notice) => {
        notice.tags.forEach((item) => {
          if (item.name === noticeTag.name) usingTag = item;
        });
      });
      if (usingTag) next(Error('해당 태그를 사용하는 공지가 있습니다.'));
      else next();
    })
    .catch((error) => next(Error(error)));
});

const NoticeTag = model<NoticeTagInterface>('NoticeTag', noticeTagSchema);

export { NoticeTag, noticeTagSchema };
