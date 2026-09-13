import { Card, Group, Stack, Text, Title } from '@mantine/core';
import { servicesMock } from '@/mocks/mockData';

export default function ServiciosPage() {
  return (
    <Stack gap="md">
      <div>
        <Title order={1}>Servicios</Title>
        <Text c="dimmed">Catálogo base de servicios ofrecidos.</Text>
      </div>

      {servicesMock.map((service) => (
        <Card key={service.id} withBorder radius="md" padding="md">
          <Group justify="space-between" align="center">
            <div>
              <Text fw={600}>{service.name}</Text>
              <Text size="sm" c="dimmed">
                Duración: {service.durationMinutes} min
              </Text>
            </div>
            <Text fw={700}>${service.price.toFixed(2)}</Text>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
