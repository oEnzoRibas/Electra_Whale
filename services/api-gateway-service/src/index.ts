// API Gateway Microservice for Electra Whale
import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
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

app.use('/api/auth', createProxyMiddleware({
  target: 'http://auth-service:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '',
  },
  onError: (err, _req, res) => {
    console.error('Error connecting to Auth Service:', err);
    res.status(500).json({error: 'Auth Service is Temporarily Unavaliable'});
  },
  onProxyReq: (proxyReq, req) => {
    console.log('[GATEWAY] Forwarding ${req.method} to ${req.url}');
  }
}));

app.use('/api/todos', createProxyMiddleware({
  target: 'http://todo-service:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '',
  },
  onError: (err, _req, res) => {
    console.error('Error connecting to Todo Service:', err);
    res.status(500).json({error: 'Todo Service is Temporarily Unavaliable'});
  },
  onProxyReq: (proxyReq, req) => {
    console.log('[GATEWAY] Forwarding ${req.method} to ${req.url}');
  }
}));


app.get('/', (_req: Request, res: Response) => {
  res.send('API Gateway Service is running NOW');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Gateway Service is running on http://0.0.0.0:${PORT}`);
})