import { Schema, model } from 'mongoose';
import { Role } from '../../types/common';
import { Validation as ValidationInterface } from '../../types/validation';

const roles: Role[] = ['회장단', '운영진', '부원'];

const validationSchema = new Schema<ValidationInterface>({
  clubId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  noticeRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  noticeWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  userRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  userWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  userColumnWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '회장단',
  },
  todoRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  todoWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  applyRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  applyWrite: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '운영진',
  },
  validationRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  validationWrite: {
    type: String,
    default: '회장단',
  },
  clubRead: {
    type: String,
    enum: {
      values: roles,
      message: '회장단, 운영진, 부원 중 하나여야 합니다.',
    },
    default: '부원',
  },
  clubWrite: {
    type: String,
    default: '회장단',
  },
  createdAt: Date,
  updatedAt: Date,
});

const Validation = model<ValidationInterface>('Validation', validationSchema);

export { Validation, validationSchema };
