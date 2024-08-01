import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function (app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
}
