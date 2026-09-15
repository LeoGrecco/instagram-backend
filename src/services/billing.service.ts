import axios from 'axios';
import { ENV } from '../config/env';
import { prisma } from './database.service';

const prices = { starter: 19, studio: 49, agency: 129 } as const;
const asaasUrl = ENV.ASAAS_ENVIRONMENT === 'production' ? 'https://api.asaas.com/v3' : 'https://sandbox.asaas.com/api/v3';

const asaas = axios.create({ baseURL: asaasUrl, timeout: 10000, headers: { access_token: ENV.ASAAS_API_KEY, 'User-Agent': 'SocialDeck/1.0' } });

export class BillingService {
  public async createSubscription(accountId: string, name: string, email: string, plan: keyof typeof prices): Promise<{ id: string; status: string }> {
    if (!ENV.ASAAS_API_KEY) throw new Error('ASAAS_API_KEY is not configured');
    const customer = await asaas.post('/customers', { name, email });
    await prisma.asaasCustomer.upsert({ where: { accountId }, update: { asaasId: customer.data.id }, create: { accountId, asaasId: customer.data.id, environment: ENV.ASAAS_ENVIRONMENT } });
    const subscription = await asaas.post('/subscriptions', { customer: customer.data.id, billingType: 'UNDEFINED', value: prices[plan], cycle: 'MONTHLY', description: `SocialDeck ${plan}` });
    await prisma.subscription.create({ data: { accountId, asaasSubscriptionId: subscription.data.id, plan, status: 'pending' } });
    return { id: subscription.data.id, status: subscription.data.status };
  }

  public async handleWebhook(eventId: string, event: string, payload: unknown): Promise<void> {
    await prisma.webhookEvent.create({ data: { externalId: eventId, event, payload: payload as object } });
    const subscriptionId = (payload as { subscription?: { id?: string } }).subscription?.id;
    if (!subscriptionId) return;
    const status = event.includes('PAYMENT_CONFIRMED') || event.includes('PAYMENT_RECEIVED') ? 'active' : event.includes('OVERDUE') ? 'overdue' : event.includes('DELETED') ? 'canceled' : undefined;
    if (status) await prisma.subscription.update({ where: { asaasSubscriptionId: subscriptionId }, data: { status } });
  }
}

export const billingService = new BillingService();