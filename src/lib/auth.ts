import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { salonDisplayName } from '@/mocks/mockData';
import type { MockSession } from '@/types';

export const SESSION_COOKIE_NAME = 'gomita-nails-session';

function decodeEmail(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function getMockSession(): Promise<MockSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  return {
    email: decodeEmail(sessionCookie.value),
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
