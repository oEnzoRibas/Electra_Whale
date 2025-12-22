import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({ error: "No token provided"});
    }

    const [, token] = authHeader.split(' ');

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        (req as any).user = decoded;

        return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  
};