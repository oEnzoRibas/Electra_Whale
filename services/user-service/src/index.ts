// API User Microservice for Electra Whale

import express, { Request, Response } from 'express';
import { errorMiddleware, authMiddleware } from '@ew/common';
import pino from 'pino';

import userRouter from './routes/user.routes.js';

const logger = pino({ name: 'user-service', level: 'info' });

const app = express();
const PORT =  process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  logger.info({ method: req.method, url: req.url }, 'Incoming request');
  next();
});

app.use('/',userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`User Service is running on http://0.0.0.0:${PORT}`);
})
