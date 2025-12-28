import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service.js';
import { tr } from 'zod/locales';
import { UserNotFoundError } from '@ew/common';

export const getUsersController = async (
    _req: Request, 
    res: Response
) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to retrieve users',
            error: 'INTERNAL_SERVER_ERROR', 
        });
    }
};

export const getUserByIdController = async (
    req: Request, 
    res: Response
) => {
    const userId = Number(req.params.userId);
    const user = await userService.getUserById(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            error: 'USER_NOT_FOUND' });
    }
    res.json(user);
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      return res.status(400).json({
        message: 'Invalid user id',
        error: 'BAD_REQUEST',
      });
    }

    await userService.deleteUser(userId);

    return res.status(200).json({
      message: 'User deleted successfully',
      deletedId: userId,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
  try {
  const userId = Number(req.params.userId);

    const updatedUser = await userService.updateUser(userId, req.body);
    res.json(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({
          message: 'User not found',
          error: 'USER_NOT_FOUND' });
    }
  } catch (error) {
    next(error);
  }
};

export const getMeController = async (
    req: any, 
    res: Response
) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
        message: 'Unauthorized',
        error: 'UNAUTHORIZED' });
  }

  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(404).json({
            message: 'User not found',
            error: 'USER_NOT_FOUND' });
  }

  res.json(user);
};