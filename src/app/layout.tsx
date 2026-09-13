import type { Metadata } from 'next';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Container,
  MantineProvider,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Navigation } from '@/components/Navigation';
import '@mantine/core/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gomita Nails',
  description: 'Sistema de gestión para citas, clientes y servicios de Gomita Nails.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es">
      <body>
        <MantineProvider>
          <AppShell padding="md">
            <AppShellHeader withBorder p="md">
              <Container size="lg">
                <Stack gap={4}>
                  <Title order={2}>Gomita Nails</Title>
                  <Text size="sm" c="dimmed">
                    Gestión de citas, clientes y servicios
                  </Text>
                  <Navigation />
                </Stack>
              </Container>
            </AppShellHeader>
            <AppShellMain>
              <Container size="lg" py="md">
                {children}
              </Container>
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
