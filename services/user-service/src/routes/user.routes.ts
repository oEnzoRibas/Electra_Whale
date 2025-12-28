import { Router } from 'express';
import { authMiddleware, AuthRequest } from '@ew/common';
import {
  getUsersController,
  getUserByIdController,
  deleteUserController,
  updateUserController,
  getMeController,
} from '../controllers/user.controller.js';

import { validateUserId } from '../middlewares/validateUserId.js';
import { ownsResource } from '../middlewares/ownsResource.js';

const usersRouter = Router();

usersRouter.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'UP',
        service: 'User Service Router',
    });
});

usersRouter.get(
    '/', 
    authMiddleware,
    getUsersController);
usersRouter.get(
    '/me', 
    authMiddleware,
    getMeController);
usersRouter.get(
    '/:userId', 
    authMiddleware,
    validateUserId, 
    getUserByIdController);
usersRouter.delete(
    '/:userId',
    authMiddleware,
    validateUserId, 
    ownsResource, 
    deleteUserController);
usersRouter.patch(
    '/:userId',
    authMiddleware,
    validateUserId, 
    ownsResource, 
    updateUserController);

export default usersRouter;