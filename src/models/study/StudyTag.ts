import { Schema, model } from 'mongoose';
import { StudyTag as StudyTagInterface } from '../../types/study';
import { Study as StudyInterface } from '../../types/study';
import { Study } from './Study';

const studyTagSchema = new Schema<StudyTagInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

studyTagSchema.pre('remove', function (next) {
  const studyTag = this;
  Study.find({ clubId: studyTag.clubId })
    .then((studies: StudyInterface[]) => {
      let usingTag: StudyTagInterface | null = null;
      studies.forEach((study) =>
        study.tags.forEach((tag) => {
          if (tag.name === studyTag.name) usingTag = tag;
        })
      );
      if (usingTag) next(Error('해당 태그를 사용하고 있는 스터디가 있습니다.'));
      else next();
    })
    .catch((error) => next(Error(error)));
});

const StudyTag = model<StudyTagInterface>('StudyTag', studyTagSchema);
export { StudyTag, studyTagSchema };
