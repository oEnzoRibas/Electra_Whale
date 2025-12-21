// API Todo Microservice for Electra Whale

import express, { Request, Response } from 'express';

const app = express();
const PORT =  process.env.PORT || 3002;

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
       status: 'UP', 
       service: 'Todo Service',
      });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Todo Service is running');
});

app.listen(PORT, () => {
    console.log(`Todo Service is running on http://0.0.0.0:${PORT}`);
})
