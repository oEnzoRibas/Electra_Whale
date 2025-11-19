// API Auth Microservice for Electra Whale

import express, { Request, Response } from 'express';
import pino from 'pino';

import authRouter from './routes/auth.routes';


const logger = pino({ name: 'auth-service', level: 'info' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRouter);

app.use((err: Error, _req: Request, res: Response, _next: Function) => {
  logger.error({ err }, 'Unhandled error occurred.');
  res.status(500).json({ message: 'Internal server error.' });
});

app.get('/health', (_req: Request, res: Response) => {
  res
    .status(200)
    .json({
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
