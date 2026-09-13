import type { Metadata } from 'next';
import { AppShell, Container, MantineProvider, Stack, Text, Title } from '@mantine/core';
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
            <AppShell.Header withBorder p="md">
              <Container size="lg">
                <Stack gap={4}>
                  <Title order={2}>Gomita Nails</Title>
                  <Text size="sm" c="dimmed">
                    Gestión de citas, clientes y servicios
                  </Text>
                  <Navigation />
                </Stack>
              </Container>
            </AppShell.Header>
            <AppShell.Main>
              <Container size="lg" py="md">
                {children}
              </Container>
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
