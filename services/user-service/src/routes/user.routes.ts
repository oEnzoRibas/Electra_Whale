import { Router } from 'express';
import { authMiddleware, AuthRequest } from '@ew/common';
import { userController } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get(
    '/', 
    authMiddleware, 
    userController.getUsers);

userRouter.get(
    '/me', 
    authMiddleware, 
    userController.getMe.bind(userController)
    );

userRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
       status: 'UP', 
       service: 'User Service',
      });
});

userRouter.get('/:userId', 
    authMiddleware, 
    userController.getUserProfile);

userRouter.delete('/:userId', 
    authMiddleware, 
    userController.deleteUser);

userRouter.patch('/:userId', 
    authMiddleware, 
    userController.updateUser.bind(userController));

export default userRouter;