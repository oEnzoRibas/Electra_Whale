import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { errorLoggerMiddleware, requestLoggerMiddleware, errorMiddleware } from "@ew/common"
import fs from "fs"
import path from "path"

export function createApp(){
    const app = express();
    const logPath = path.join(process.cwd(), "logs/app.log")

    // app.use(express.json());
    app.use(requestLoggerMiddleware);

    // API SERVICE PROXY 
    app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({
           status: 'UP', 
           service: 'API Gateway Service',
          });
    });
    
    app.get('/api/logs', (_req: Request, res: Response) => {
      fs.readFile(logPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading log file:' + err.message, err);
          return res.status(500).json({ error: 'Could not read log file' });
        }
        res.type('text/plain').send(data);
      });
    });

    // AUTH SERVICE PROXY

    app.use('/api/auth', createProxyMiddleware({
      target: `http://auth-service:${process.env.AUTH_SERVICE_PORT}`,
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

    // TODO SERVICE PROXY

    app.use('/api/todos', createProxyMiddleware({
      target: `http://todo-service:${process.env.TODO_SERVICE_PORT}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api/todos': '',
      },
      onError: (err, _req, res) => {
        console.error('Error connecting to Todo Service:', err);
        res.status(500).json({error: 'Todo Service is Temporarily Unavaliable'});
      },
      onProxyReq: (proxyReq, req) => {
        console.log('[GATEWAY] Forwarding ${req.method} to ${req.url}');
      }
    }));

    app.use(errorLoggerMiddleware);

    // USER SERVICE PROXY

    app.use('/api/users', createProxyMiddleware({
      target: `http://user-service:${process.env.USER_SERVICE_PORT}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api/users': '',
      },
      onError: (err, _req, res) => {
        console.error('Error connecting to User Service:', err);
        res.status(500).json({error: 'User Service is Temporarily Unavaliable'});
      },
      onProxyReq: (proxyReq, req) => {
        console.log('[GATEWAY] Forwarding ${req.method} to ${req.url}');
      } 
    }));


    // GOOGLE CALENDAR SERVICE PROXY
    
    app.use('/api/calendar', createProxyMiddleware({
      target: `http://google-calendar-service:${process.env.GOOGLE_CALENDAR_SERVICE_PORT}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api/calendar': '',
      },
      onError: (err, _req, res) => {
        console.error('Error connecting to Google Calendar Service:', err);
        res.status(500).json({error: 'Google Calendar Service is Temporarily Unavaliable'});
      },
      onProxyReq: (proxyReq, req) => {
        console.log('[GATEWAY] Forwarding ${req.method} to ${req.url}');
      } 
    }));

    app.use(errorMiddleware);

    return app;
}