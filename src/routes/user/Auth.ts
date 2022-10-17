import express from 'express';
import { login, logout, verify } from '../../controllers/user/Auth';
import { auth } from '../../middlewares/auth';

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/verify', auth, verify);

export default authRouter;
