// API Gateway Microservice for Electra Whale
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
console.log("POSTGRES_HOST:", process.env.POSTGRES_HOST);

const app = express();
const PORT =  process.env.PORT || 8080;

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
       status: 'UP', 
       service: 'API Gateway Service',
      });
});

app.get('/', (_req: Request, res: Response) => {
  res.send('API Gateway Service is running');
});

app.listen(PORT, () => {
    console.log(`API Gateway Service is running on http://0.0.0.0:${PORT}`);
})