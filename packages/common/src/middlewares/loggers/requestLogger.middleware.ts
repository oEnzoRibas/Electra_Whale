import { Request, Response, NextFunction, RequestHandler } from 'express';
import crypto from 'crypto';
import { logger } from '../../utils/logger.js';

export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId = crypto.randomUUID();
  const start = process.hrtime.bigint();
  
  (req as any).requestId = requestId;

  logger.info(
      {
        requestId,
        method: req.method,
        path: req.originalUrl,
        ip: req.ip,
        body: req.body,
      },
      'Incoming request'
  );

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;

    logger.info(
        {
          requestId,
          statusCode: res.statusCode,
          durationMs,
        },
        'Request completed'
    );
  }
  );
  
  next();
}