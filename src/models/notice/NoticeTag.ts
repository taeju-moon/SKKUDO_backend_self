import { Schema, model } from 'mongoose';
import { NoticeTag as NoticeTagInterface } from '../../types/notice';
import { NoticeTag } from '../../types/notice';
import { Notice as NoticeInterface } from '../../types/Notice';
import { Notice } from './Notice';

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

noticeTagSchema.pre('remove', function (next) {
  const noticeTag = this;
  Notice.find({ clubId: noticeTag.clubId })
    .then((notices: NoticeInterface[]) => {
      const filtered = notices.filter((notice) =>
        notice.tags.includes(noticeTag)
      );
      if (filtered.length > 0)
        next(Error('해당 태그를 사용하는 일정이 있습니다.'));
      else next();
    })
    .catch((error) => next(Error(error)));
});

const NoticeTag = model<NoticeTagInterface>('NoticeTag', noticeTagSchema);

export { NoticeTag, noticeTagSchema };
