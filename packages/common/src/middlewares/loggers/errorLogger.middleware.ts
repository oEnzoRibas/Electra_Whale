import { Request, Response, NextFunction, RequestHandler } from 'express';
import { logger } from '../../utils/logger.js';

export function errorLoggerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(
      {
        requestId: (req as any).requestId,
        message: err.message,
        stack: err.stack,
        originalUrl: req.originalUrl,
        method: req.method,
        ip: req.ip,
        body: req.body,
      },
      'Unhandled error occurred during request'
  );
 res.status(500).json({
    error: "Internal server error",
  })
}

