import axios from 'axios';
import { AsaasAccount } from '../types';

const baseUrl = (environment: AsaasAccount['environment']): string =>
  environment === 'production' ? 'https://api.asaas.com/v3' : 'https://sandbox.asaas.com/api/v3';

export class AsaasService {
  public async testConnection(account: AsaasAccount): Promise<{ name?: string; accountId?: string }> {
    const response = await axios.get(`${baseUrl(account.environment)}/myAccount`, {
      headers: { access_token: account.apiKey, 'User-Agent': 'SocialDeck/1.0' },
      timeout: 10000,
    });
    return { name: response.data.name, accountId: response.data.id };
  }
}

export const asaasService = new AsaasService();