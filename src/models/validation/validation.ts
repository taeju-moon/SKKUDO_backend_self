import { Schema, model, Model } from 'mongoose';
import { Role, Method } from '../../types/common';
import { Validation as ValidationInterface } from '../../types/validation';
import validationRouter from './../../routes/validation';

const roles: Role[] = ['회장', '부회장', '운영진', '부원'];

const validationSchema = new Schema<ValidationInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  noticeRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  noticeWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  userRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  userWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  userColumnWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부회장',
  },
  todoRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  todoWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  applyRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  applyWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  validationRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  validationWrite: {
    type: String,
    default: '회장',
  },
  clubRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  clubWrite: {
    type: String,
    default: '회장',
  },
  tagWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장, 부회장, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  createdAt: Date,
  updatedAt: Date,
});

validationSchema.statics.findValidator = (
  validation: ValidationInterface,
  method: Method,
  uri: string
): Role => {
  if (uri.startsWith('/notices/notices')) {
    if (method === 'GET') return validation.noticeRead;
    else return validation.noticeWrite;
  } else if (uri.startsWith('/clubs/clubs')) {
    if (method === 'GET') return validation.clubRead;
    else return validation.clubWrite;
  } else if (uri.startsWith('/validations/validations')) {
    if (method === 'GET') return validation.validationRead;
    else return validation.validationWrite;
  } else if (uri.startsWith('/applies/applier')) {
    if (method === 'GET') return validation.applyRead;
    else return validation.applyWrite;
  } else if (uri.startsWith('/todos/todos')) {
    if (method === 'GET') return validation.todoRead;
    else return validation.todoWrite;
  } else if (uri.startsWith('/users')) {
    if (method === 'GET') return validation.userRead;
    else if (uri.startsWith('/users/club')) return validation.userColumnWrite;
    else return validation.userWrite;
  } else {
    if (uri.includes('tag') && method !== 'GET') return validation.tagWrite;
  }
  return '회장';
};

const validatorTable = {
  회장: 4,
  부회장: 3,
  운영진: 2,
  부원: 1,
};

validationSchema.statics.validateUser = (
  validator: Role,
  myLevel: Role
): boolean => {
  return validatorTable[myLevel] >= validatorTable[validator];
};

interface ValidationModel extends Model<ValidationInterface> {
  findValidator(
    validation: ValidationInterface,
    method: Method,
    uri: string
  ): Role;
  validateUser(validator: Role, myLevel: Role): boolean;
}

const Validation = model<ValidationInterface, ValidationModel>(
  'Validation',
  validationSchema
);

export { Validation, validationSchema };
