import { Request, Response } from 'express';
import { ENV } from '../config/env';
import { findAccountById } from '../repositories/account.data';
import { billingService } from '../services/billing.service';

export class BillingController {
  public async subscribe(req: Request, res: Response): Promise<void> {
    const account = req.accountId ? await findAccountById(req.accountId) : undefined;
    const plan = req.body.plan === 'studio' || req.body.plan === 'agency' ? req.body.plan : 'starter';
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    try {
      const subscription = await billingService.createSubscription(account.id, account.name, account.email, plan);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(503).json({ message: error instanceof Error ? error.message : 'Billing is not configured' });
    }
  }

  public async webhook(req: Request, res: Response): Promise<void> {
    if (!ENV.ASAAS_WEBHOOK_TOKEN || req.header('asaas-access-token') !== ENV.ASAAS_WEBHOOK_TOKEN) {
      res.status(401).json({ message: 'Invalid webhook token' });
      return;
    }
    const eventId = typeof req.body.id === 'string' ? req.body.id : '';
    const event = typeof req.body.event === 'string' ? req.body.event : '';
    if (!eventId || !event) {
      res.status(400).json({ message: 'Invalid webhook payload' });
      return;
    }
    try {
      await billingService.handleWebhook(eventId, event, req.body);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        res.status(204).send();
        return;
      }
      res.status(500).json({ message: 'Webhook could not be processed' });
    }
  }
}