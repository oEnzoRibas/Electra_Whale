import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/auth.js';

export const authMiddleware : RequestHandler = (
  req: any,
  res: Response,
  next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({ error: "No token provided"});
    }

    const [scheme, token] = authHeader.split(' ');

    if (!/^Bearer$/i.test(scheme)) {
        return  res.status(401).json({ error: 'Malformed token' });
    }

    try{
        const decoded = jwt.verify(
          token, 
          process.env.AUTH_JWT_SECRET || 'fallback_secret'
        ) as UserPayload;


        req.user = decoded;
        
        return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  
};