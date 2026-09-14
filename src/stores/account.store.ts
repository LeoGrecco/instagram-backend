import { randomUUID } from 'crypto';
import { Account } from '../types';

export interface AccountStore {
  create(account: Omit<Account, 'id' | 'createdAt'>): Account;
  findByEmail(email: string): Account | undefined;
  findById(id: string): Account | undefined;
  list(): Account[];
  updateInstagramToken(id: string, instagramAccessToken: string): Account | undefined;
  clear(): void;
}

export class InMemoryAccountStore implements AccountStore {
  private accounts = new Map<string, Account>();

  public create(account: Omit<Account, 'id' | 'createdAt'>): Account {
    const created: Account = { ...account, id: randomUUID(), createdAt: new Date().toISOString() };
    this.accounts.set(created.id, created);
    return created;
  }

  public findByEmail(email: string): Account | undefined {
    return [...this.accounts.values()].find((account) => account.email === email);
  }

  public findById(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  public list(): Account[] {
    return [...this.accounts.values()];
  }

  public updateInstagramToken(id: string, instagramAccessToken: string): Account | undefined {
    const account = this.accounts.get(id);
    if (!account) return undefined;
    account.instagramAccessToken = instagramAccessToken;
    return account;
  }

  public clear(): void {
    this.accounts.clear();
  }
}

export const accountStore = new InMemoryAccountStore();