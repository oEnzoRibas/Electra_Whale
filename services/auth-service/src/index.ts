// API Auth Microservice for Electra Whale

import express, { Request, Response } from 'express';

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
    console.log(`Auth Service is running on http://0.0.0.0:${PORT}`);
})
