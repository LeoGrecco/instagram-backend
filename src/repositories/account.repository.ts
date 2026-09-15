import { Plan } from '@prisma/client';
import { prisma } from '../services/database.service';
import { Account } from '../types';

const toPlan = (plan: string): Plan => plan === 'studio' ? Plan.studio : plan === 'agency' ? Plan.agency : Plan.starter;
const toDomain = (account: { id: string; name: string; email: string; passwordHash: string; plan: Plan; instagramToken: string | null; createdAt: Date }): Account => ({
  id: account.id,
  name: account.name,
  email: account.email,
  passwordHash: account.passwordHash,
  plan: account.plan as Account['plan'],
  instagramAccessToken: account.instagramToken || undefined,
  createdAt: account.createdAt.toISOString(),
});

export class AccountRepository {
  public async findByEmail(email: string) {
    const account = await prisma.account.findUnique({ where: { email } });
    return account ? toDomain(account) : undefined;
  }

  public async findById(id: string) {
    const account = await prisma.account.findUnique({ where: { id } });
    return account ? toDomain(account) : undefined;
  }

  public async create(data: { name: string; email: string; passwordHash: string; plan: string }) {
    return toDomain(await prisma.account.create({ data: { name: data.name, email: data.email, passwordHash: data.passwordHash, plan: toPlan(data.plan) } }));
  }

  public async updateInstagramToken(id: string, token: string) {
    return toDomain(await prisma.account.update({ where: { id }, data: { instagramToken: token } }));
  }

  public async list() {
    const accounts = await prisma.account.findMany({ orderBy: { createdAt: 'desc' } });
    return accounts.map(toDomain);
  }
}

export const accountRepository = new AccountRepository();