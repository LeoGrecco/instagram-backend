import express from 'express';
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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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