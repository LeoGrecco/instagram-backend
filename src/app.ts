import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { setRoutes } from './routes/instagram.routes';
import { setAuthRoutes } from './routes/auth.routes';
import { setAccountRoutes } from './routes/account.routes';
import { setAdminRoutes } from './routes/admin.routes';
import { setWidgetRoutes } from './routes/widget.routes';
import { setBillingRoutes } from './routes/billing.routes';
import { ENV } from './config/env';

export const createApp = (): express.Express => {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));

  app.use(express.static(path.join(__dirname, '../public')));

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/auth', setAuthRoutes());
  app.use('/api/account', setAccountRoutes());
  app.use('/api/admin', setAdminRoutes());
  app.use('/api/widget', setWidgetRoutes());
  app.use('/api/billing', setBillingRoutes());
  app.use('/api', setRoutes());
  return app;
};

if (require.main === module) {
  createApp().listen(ENV.PORT, () => {
    console.log(`Server is running on http://localhost:${ENV.PORT}`);
  });
}