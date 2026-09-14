import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getMockSession } from '@/lib/auth';
import { AppProviders } from '@/components/providers/AppProviders';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gomita Nails',
  description: 'Sistema de gestión para citas, clientes y servicios de Gomita Nails.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getMockSession();

  return (
    <html lang="es">
      <body>
        <AppProviders initialSession={session}>{children}</AppProviders>
      </body>
    </html>
  );
}
