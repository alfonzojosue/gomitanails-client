import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import { IconHeart, IconRuler, IconSparkles, IconUserHeart } from '@tabler/icons-react';
import type { Client } from '@/types';

interface ClientCardProps {
  client: Client;
  appointmentCount?: number;
  upcomingLabel?: string;
}

export function ClientCard({ client, appointmentCount = 0, upcomingLabel }: ClientCardProps) {
  return (
    <Card className="glass-panel">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text fw={700} size="lg">
              {client.name}
            </Text>
            <Text size="sm" c="dimmed">
              {client.phone} {client.email ? `· ${client.email}` : ''}
            </Text>
          </div>
          <Badge color="lavender">{appointmentCount} citas</Badge>
        </Group>

        <Group gap="xs">
          {client.allergies.length > 0 ? (
            client.allergies.map((allergy) => (
              <Badge key={allergy} color="sunshine" leftSection={<IconHeart size={12} />}>
                {allergy}
              </Badge>
            ))
          ) : (
            <Badge color="mint" leftSection={<IconUserHeart size={12} />}>
              Sin alergias registradas
            </Badge>
          )}
        </Group>

        <Group grow>
          <Card bg="rgba(255, 240, 245, 0.82)" radius="xl" padding="md" withBorder={false}>
            <Group gap="xs" wrap="nowrap" align="flex-start">
              <IconRuler size={18} color="var(--mantine-color-bubblegum-6)" />
              <div>
                <Text size="sm" fw={700}>
                  Largo y forma
                </Text>
                <Text size="sm">
                  {client.preferredLength} · {client.preferredShape}
                </Text>
              </div>
            </Group>
          </Card>
          <Card bg="rgba(243, 231, 255, 0.82)" radius="xl" padding="md" withBorder={false}>
            <Group gap="xs" wrap="nowrap" align="flex-start">
              <IconSparkles size={18} color="var(--mantine-color-lavender-7)" />
              <div>
                <Text size="sm" fw={700}>
                  Estilo favorito
                </Text>
                <Text size="sm">{client.favoriteStyle}</Text>
              </div>
            </Group>
          </Card>
        </Group>

        <div>
          <Text size="sm" fw={700}>
            Notas especiales de uñas
          </Text>
          <Text size="sm">{client.nailNotes}</Text>
        </div>

        <Text size="sm" c="dimmed">
          {client.notes}
        </Text>

        {upcomingLabel ? (
          <Badge color="bubblegum" variant="dot">
            Próxima visita: {upcomingLabel}
          </Badge>
        ) : null}
      </Stack>
    </Card>
  );
}
