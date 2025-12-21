// API Google Calendar Microservice for Electra Whale

import express, { Request, Response } from 'express';

const app = express();
const PORT =  process.env.PORT || 3004;

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
       status: 'UP', 
       service: 'Google Calendar Service',
      });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Google Calendar Service is running');
});

app.listen(PORT, () => {
    console.log(`Google Calendar Service is running on http://0.0.0.0:${PORT}`);
})
