import { AppShell, AppShellHeader, AppShellMain, Badge, Container, Group, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconHeartSpark, IconSparkles } from '@tabler/icons-react';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Navigation } from '@/components/Navigation';
import { requireMockSession } from '@/lib/auth';

export default async function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireMockSession();

  return (
    <AppShell padding="md" header={{ height: { base: 188, sm: 168 } }}>
      <AppShellHeader withBorder={false} bg="transparent" p="md">
        <Container size="lg">
          <Paper className="glass-panel" p="md" radius="xl">
            <Stack gap="md">
              <Group justify="space-between" align="flex-start">
                <Group align="flex-start" gap="sm">
                  <ThemeIcon
                    size={52}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'bubblegum.5', to: 'lavender.5', deg: 145 }}
                  >
                    <IconSparkles size={24} />
                  </ThemeIcon>
                  <div>
                    <Group gap="xs">
                      <Title order={2}>Gomita Nails</Title>
                      <Badge color="bubblegum" leftSection={<IconHeartSpark size={12} />}>
                        Studio Mode
                      </Badge>
                    </Group>
                    <Text size="sm" c="dimmed">
                      Sesión activa para {session.email}
                    </Text>
                  </div>
                </Group>
                <LogoutButton />
              </Group>
              <Navigation />
            </Stack>
          </Paper>
        </Container>
      </AppShellHeader>
      <AppShellMain>
        <Container size="lg" py="xl">
          {children}
        </Container>
      </AppShellMain>
    </AppShell>
  );
}
