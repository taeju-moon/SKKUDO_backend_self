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
  }
);

//import Routes
import ClubTypeRouter from './routes/club/ClubType';

app.use('/clubs/clubTypes', ClubTypeRouter);

app.listen(8000, () => {
  console.log('8000번 포트 대기중...');
});
