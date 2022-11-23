import express from 'express';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

//서버에 uploads 파일이 없다면 새로 생성 (club의 image를 저장하는 폴더)
try {
  fs.readdirSync('uploads');
} catch (error) {
  fs.mkdirSync('uploads');
}

const app = express();

//CORS
const corsOption = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'http://www.skkudo.link'
      : 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); //uploads 폴더 접근

//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then(() => console.log('몽고디비 연결완료'))
  .catch((error) => console.log(error));

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.cookie('ai_user', 'ai_user', { sameSite: 'none', secure: true });
    res.send('hello');
  }
);

//import Routes
import ClubTypeRouter from './routes/club/ClubType';
import ClubRouter from './routes/club/Club';
import NoticeTagRouter from './routes/notice/NoticeTag';
import NoticeRouter from './routes/notice/Notice';
import ToDoTagRouter from './routes/todo/ToDoTag';
import ToDoRouter from './routes/todo/ToDo';
import UserRouter from './routes/user/User';
import AuthRouter from './routes/user/Auth';
import ValidationRouter from './routes/validation';
import ApplierRouter from './routes/apply/Applier';
import AppliedUserRouter from './routes/apply/AppliedUser';
import StudyTagRouter from './routes/study/StudyTag';
import StudyRouter from './routes/study/Study';
import BudgetRouter from './routes/budget/Budget';
import MinuteTagRouter from './routes/minute/MinuteTag';
import MinuteRouter from './routes/minute/Minute';

app.use('/clubs/clubTypes', ClubTypeRouter);
app.use('/clubs/clubs', ClubRouter);
app.use('/notices/noticeTags', NoticeTagRouter);
app.use('/notices/notices', NoticeRouter);
app.use('/todos/toDoTags', ToDoTagRouter);
app.use('/todos/toDos', ToDoRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/validations', ValidationRouter);
app.use('/applies/appliers', ApplierRouter);
app.use('/applies/appliedUsers', AppliedUserRouter);
app.use('/studies/studyTags', StudyTagRouter);
app.use('/studies/studies', StudyRouter);
app.use('/budgets/budgets', BudgetRouter);
app.use('/minutes/minuteTags', MinuteTagRouter);
app.use('/minutes/minutes', MinuteRouter);

app.listen(8000, () => {
  console.log('8000번 포트 대기중...');
});
