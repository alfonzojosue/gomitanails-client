import { Card, Group, Stack, Text } from '@mantine/core';
import type { Client } from '@/types';

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card withBorder radius="md" padding="md">
      <Stack gap={6}>
        <Text fw={600}>{client.name}</Text>
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            Tel:
          </Text>
          <Text size="sm">{client.phone}</Text>
        </Group>
        {client.email ? (
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              Email:
            </Text>
            <Text size="sm">{client.email}</Text>
          </Group>
        ) : null}
        <Text size="sm" c="dimmed">
          {client.notes}
        </Text>
      </Stack>
    </Card>
  );
}
