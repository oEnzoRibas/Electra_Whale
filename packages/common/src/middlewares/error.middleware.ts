import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appErrors.js';
import pino from 'pino';

const logger = pino({ name: 'error-middleware' });

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        error: err.code,
        message: err.message,
      });
    }
  }

  logger.error({ err }, 'Unhandled error');

  return res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Unexpected error occurred',
  });
}
