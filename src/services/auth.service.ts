import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { ENV } from '../config/env';
import { Account } from '../types';

const encode = (value: string): string => Buffer.from(value).toString('base64url');

export class AuthService {
  public hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  public verifyPassword(password: string, storedHash: string): boolean {
    const [salt, expected] = storedHash.split(':');
    if (!salt || !expected) return false;
    const actual = scryptSync(password, salt, 64);
    return actual.length === Buffer.from(expected, 'hex').length && timingSafeEqual(actual, Buffer.from(expected, 'hex'));
  }

  public createSession(account: Account): string {
    const expiresAt = Date.now() + ENV.SESSION_TTL_HOURS * 60 * 60 * 1000;
    const payload = encode(JSON.stringify({ accountId: account.id, expiresAt }));
    const signature = createHmac('sha256', ENV.APP_SECRET).update(payload).digest('base64url');
    return `${payload}.${signature}`;
  }

  public readSession(token: string): string | undefined {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return undefined;
    const expected = createHmac('sha256', ENV.APP_SECRET).update(payload).digest('base64url');
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return undefined;
    try {
      const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { accountId: string; expiresAt: number };
      return session.expiresAt > Date.now() ? session.accountId : undefined;
    } catch {
      return undefined;
    }
  }

  public createAdminSession(): string {
    const payload = encode(JSON.stringify({ role: 'admin', expiresAt: Date.now() + ENV.SESSION_TTL_HOURS * 60 * 60 * 1000 }));
    const signature = createHmac('sha256', ENV.APP_SECRET).update(payload).digest('base64url');
    return `admin.${payload}.${signature}`;
  }

  public isAdminSession(token: string): boolean {
    const [, payload, signature] = token.split('.');
    if (!payload || !signature) return false;
    const expected = createHmac('sha256', ENV.APP_SECRET).update(payload).digest('base64url');
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    try {
      const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { role: string; expiresAt: number };
      return session.role === 'admin' && session.expiresAt > Date.now();
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();