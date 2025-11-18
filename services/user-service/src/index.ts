// API User Microservice for Electra Whale

import express, { Request, Response } from 'express';

const app = express();
const PORT =  process.env.PORT || 8080;

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
       status: 'UP', 
       service: 'User Service',
      });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('User Service is running');
});

app.listen(PORT, () => {
    console.log(`User Service is running on http://0.0.0.0:${PORT}`);
})
