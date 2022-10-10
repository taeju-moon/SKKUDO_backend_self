import express from 'express';
import { login, logout, verify } from '../../controllers/user/Auth';

const authRouter = express.Router();

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/verify', verify);

export default authRouter;
