import { Schema, model, Types } from 'mongoose';
import { MinuteTag as MinuteTagInterface } from '../../types/minute';
import { Minute as MinuteInterface } from '../../types/minute';
import { Minute } from './Minute';

const minuteTagSchema = new Schema<MinuteTagInterface>({
  clubId: {
    type: String,
    required: true,
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

minuteTagSchema.pre('remove', function (next) {
  const minuteTag = this;
  Minute.find({ clubId: minuteTag.clubId })
    .then((minutes: MinuteInterface[]) => {
      let usingTag: boolean = false;
      minutes.forEach((minute) => {
        if (minute.minuteTags.indexOf(minuteTag.name) >= 0) {
          usingTag = true;
        }
      });
      if (usingTag) next(Error('해당 태그를 사용하는 회의록이 있습니다.'));
      else next();
    })
    .catch((error) => next(Error(error)));
});

const MinuteTag = model<MinuteTagInterface>('MinuteTag', minuteTagSchema);

export { MinuteTag, minuteTagSchema };
