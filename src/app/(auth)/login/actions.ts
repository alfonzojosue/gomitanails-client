'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_NAME } from '@/lib/auth';
import type { LoginActionState } from '@/types';

export async function login(
  _previousState: LoginActionState | undefined,
  formData: FormData,
): Promise<LoginActionState | undefined> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '').trim();

  if (!email || !email.includes('@')) {
    return { error: 'Ingresa un correo válido para iniciar sesión.' };
  }

  if (password.length < 4) {
    return { error: 'La contraseña mock debe tener al menos 4 caracteres.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, encodeURIComponent(email), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  redirect('/');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect('/login');
}
