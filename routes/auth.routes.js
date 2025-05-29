import {Router} from 'express'
import { signIn, signOut, signUp } from '../controller/auth.controller.js';

const authRouter=Router();

authRouter.post('/sign-up',signUp);
authRouter.post('/sign-out',signOut);
authRouter.post('/sign-in',signIn);

export default authRouter;