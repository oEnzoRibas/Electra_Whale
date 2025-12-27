// API Auth Microservice for Electra Whale

import express, { Request, Response } from 'express';
import pino from 'pino';
import { errorMiddleware } from '@ew/common';
import authRouter from './routes/auth.routes';
import { RegisterController } from './controllers/auth.controller';


const logger = pino({ name: 'auth-service', level: 'info' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Auth Service is running on http://0.0.0.0:${PORT}`);
})
