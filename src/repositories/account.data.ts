import { ENV } from '../config/env';
import { accountRepository } from './account.repository';
import { accountStore } from '../stores/account.store';

export const databaseEnabled = Boolean(ENV.DATABASE_URL);

export const findAccountByEmail = (email: string) => databaseEnabled ? accountRepository.findByEmail(email) : Promise.resolve(accountStore.findByEmail(email));
export const findAccountById = (id: string) => databaseEnabled ? accountRepository.findById(id) : Promise.resolve(accountStore.findById(id));
export const createAccount = (data: { name: string; email: string; passwordHash: string; plan: 'starter' | 'studio' | 'agency' }) => databaseEnabled ? accountRepository.create(data) : Promise.resolve(accountStore.create(data));
export const updateInstagramToken = (id: string, token: string) => databaseEnabled ? accountRepository.updateInstagramToken(id, token) : Promise.resolve(accountStore.updateInstagramToken(id, token));
export const listAccounts = () => databaseEnabled ? accountRepository.list() : Promise.resolve(accountStore.list());