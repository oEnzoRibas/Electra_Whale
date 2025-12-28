import { Request, Response, NextFunction } from 'express';

export function validateUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const rawId = req.params.userId;
  const id = Number(rawId);

  if (!rawId || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  req.params.userId = String(id);
  next();
}