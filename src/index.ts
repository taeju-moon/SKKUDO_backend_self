import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

//CORS
const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then(() => console.log('몽고디비 연결완료'))
  .catch((error) => console.log(error));

app.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('hello');
    res.cookie('foo', 'bar', {
      sameSite: true,
      secure: true,
    });
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

app.listen(8000, () => {
  console.log('8000번 포트 대기중...');
});
