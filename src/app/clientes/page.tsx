import { Stack, Text, Title } from '@mantine/core';
import { ClientCard } from '@/components/clients/ClientCard';
import { clientsMock } from '@/mocks/mockData';

export default function ClientesPage() {
  return (
    <Stack gap="md">
      <div>
        <Title order={1}>Clientes</Title>
        <Text c="dimmed">Listado inicial de clientas y notas relevantes.</Text>
      </div>

      {clientsMock.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </Stack>
  );
}
