import { Router } from 'express';
import { RegisterController, loginController } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', RegisterController);
authRouter.post('/login', loginController);

export default authRouter;