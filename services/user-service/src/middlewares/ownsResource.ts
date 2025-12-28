import { Response, NextFunction } from 'express';
import { AuthRequest } from '@ew/common';

export function ownsResource(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.params.userId);
  const authUserId = req.user?.id;

  if (!authUserId) {
    return res.status(401).json({ 
      message: 'You are unauthorized to perform this action',
      error: 'UNAUTHORIZED' });
  }

  if (userId !== authUserId) {
    return res.status(403).json({
      message: 'You do not have permission to access this resource',
      error: 'FORBIDDEN' });
  }

  next();
}
