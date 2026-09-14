import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { salonDisplayName } from '@/mocks/mock-data';
import type { MockSession } from '@/types';

export const SESSION_COOKIE_NAME = 'gomita-nails-session';

function getSessionSecret() {
  if (process.env.GOMITA_SESSION_SECRET) {
    return process.env.GOMITA_SESSION_SECRET;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'gomita-nails-dev-session-secret';
  }

  throw new Error('GOMITA_SESSION_SECRET es obligatorio en producción.');
}

function createSignature(payload: string) {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

function getSessionEmail(token: string) {
  const [payload, signature] = token.split('.');

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = createSignature(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (actualBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const decodedValue = Buffer.from(payload, 'base64url').toString('utf8');
    const sessionData = JSON.parse(decodedValue) as { email?: string };

    if (!sessionData.email) {
      return null;
    }

    return sessionData.email;
  } catch {
    return null;
  }
}

export function createSessionToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email })).toString('base64url');
  return `${payload}.${createSignature(payload)}`;
}

export async function getMockSession(): Promise<MockSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  const email = getSessionEmail(sessionCookie.value);

  if (!email) {
    return null;
  }

  return {
    email,
    displayName: salonDisplayName,
    isAuthenticated: true,
  };
}

export async function requireMockSession() {
  const session = await getMockSession();

  if (!session) {
    redirect('/login');
  }

  return session;
}
