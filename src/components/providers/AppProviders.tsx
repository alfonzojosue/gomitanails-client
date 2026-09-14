'use client';

import { type ReactNode } from 'react';
import 'dayjs/locale/es';
import { DatesProvider } from '@mantine/dates';
import { MantineProvider } from '@mantine/core';
import type { MockSession } from '@/types';
import { theme } from '@/theme/theme';
import { AppDataProvider } from './AppDataProvider';
import { AuthProvider } from './AuthProvider';

export function AppProviders({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession: MockSession | null;
}) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <DatesProvider settings={{ locale: 'es', timezone: 'America/Mexico_City' }}>
        <AuthProvider initialSession={initialSession}>
          <AppDataProvider>{children}</AppDataProvider>
        </AuthProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
