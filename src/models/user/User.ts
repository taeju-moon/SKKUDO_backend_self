import { Schema, model } from 'mongoose';
import { User as UserInterface } from '../../types/user';
import { Location } from '../../types/common';
import { registeredClubShcema } from './RegisteredClub';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const locations: Location[] = ['인사캠', '자과캠'];

const userSchema = new Schema<UserInterface>({
  studentId: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    message: '10자리의 학번을 정확하게 입력하세요.',
  },
  userID: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    message: '아이디는 필수 사항이며 5자리 이상, 중복되어서는 안됩니다.',
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    message: '비밀번호는 5자리 이상이어야 합니다.',
  },
  location: {
    type: String,
    required: true,
    enum: {
      values: locations,
      message: '인사캠 또는 자과캠이어야 합니다.',
    },
  },
  registeredClubs: {
    type: [registeredClubShcema],
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

//유저 모델 저장 전 시행되는 미들웨어; 비밀번호를 암호화함;
userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt
      .genSalt(parseInt(process.env.SALT_ROUNDS as string))
      .then((salt: string) => {
        bcrypt
          .hash(user.password, salt)
          .then((hashedPW: string) => {
            user.password = hashedPW;
            next();
          })
          .catch((error: any) => next(error));
      })
      .catch((error: any) => next(error));
  }
});

userSchema.methods.comparePassword = function (
  plainPassword: string,
  callback: (err: boolean, isMatch: boolean) => void
) {
  bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch: boolean) => callback(false, isMatch))
    .catch(() => callback(true, false));
};

userSchema.methods.generateToken = function (
  callback: (error: any, user: UserInterface | null) => void
) {
  const user = this;
  const token = jwt.sign(
    {
      data: user._id.toHexString(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //24시간 후 토큰 만료됨
    },
    process.env.SECRET_TOKEN as string
  );
  user.token = token;
  user
    .save()
    .then((user: UserInterface) => callback(null, user))
    .catch((error: any) => callback(error, null));
};

userSchema.statics.findByToken = function (token, callback) {
  const user = this;
  //jwt.verify();
};

const User = model<UserInterface>('User', userSchema);

export { User, userSchema };
