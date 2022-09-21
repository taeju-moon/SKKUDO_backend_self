import { Schema } from 'mongoose';
import { Column as ColumnInterface, ValueType } from '../../types/common';

const valueTypes: ValueType[] = ['string', 'number', 'boolean'];

const columnSchema = new Schema<ColumnInterface>({
  key: {
    type: String,
    required: true,
  },
  valueType: {
    type: String,
    required: true,
    enum: {
      values: valueTypes,
      message: '열 형식은 문자, 숫자, O/X 중 하나의 값이 와야 합니다.',
    },
  },
});

export { columnSchema };
