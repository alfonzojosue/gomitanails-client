import { Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { appointmentsMock, clientsMock, servicesMock } from '@/mocks/mockData';

const stats = [
  { label: 'Citas registradas', value: appointmentsMock.length },
  { label: 'Clientes activos', value: clientsMock.length },
  { label: 'Servicios disponibles', value: servicesMock.length },
];

export default function HomePage() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={1}>Panel principal</Title>
        <Text c="dimmed">Resumen general del negocio y acceso rápido a módulos.</Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {stats.map((item) => (
          <Card key={item.label} withBorder radius="md" padding="md">
            <Group justify="space-between">
              <Text>{item.label}</Text>
              <Text fw={700}>{item.value}</Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
