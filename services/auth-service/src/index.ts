// API Auth Microservice for Electra Whale

import express, { Request, Response } from 'express';
import pino from 'pino';
const logger = pino({ name: 'auth-service', level: 'info' });

const app = express();
const PORT =  process.env.PORT || 8080;

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
       status: 'UP', 
       service: 'Auth Service',
      });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Auth Service is running');
});

app.listen(PORT, () => {
    logger.info(`Auth Service is running on http://0.0.0.0:${PORT}`);
})
