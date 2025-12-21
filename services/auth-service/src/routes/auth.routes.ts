import { Router } from 'express';
import { RegisterController, loginController } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', RegisterController);
authRouter.post('/login', loginController);

authRouter.get('/', (_req, res) => {
  res.send('Auth Router is working');
});

authRouter.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'UP',
        service: 'Auth Service Router',
    });
});

export default authRouter;