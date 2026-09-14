'use client';

import { useMemo, useState } from 'react';
import { Card, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ClientCard } from '@/components/clients/ClientCard';
import { useAppData } from '@/components/providers/AppDataProvider';
import { formatAppointmentDate } from '@/lib/appointments';

export default function ClientesPage() {
  const { appointments, clients } = useAppData();
  const [search, setSearch] = useState('');

  const filteredClients = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return clients.filter((client) => {
      if (!searchValue) {
        return true;
      }

      return (
        client.name.toLowerCase().includes(searchValue) ||
        client.phone.toLowerCase().includes(searchValue) ||
        client.favoriteStyle.toLowerCase().includes(searchValue)
      );
    });
  }, [clients, search]);

  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Clientes</Title>
        <Text c="dimmed">
          Busca por nombre, teléfono o estilo favorito para ubicar rápido a cada clienta.
        </Text>
      </div>

      <Card className="glass-panel">
        <TextInput
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          label="Buscador visual"
          placeholder="Andrea, chrome rose, +52..."
          leftSection={<IconSearch size={16} />}
        />
      </Card>

      {filteredClients.length > 0 ? (
        <SimpleGrid cols={{ base: 1, lg: 2 }}>
          {filteredClients.map((client) => {
            const clientAppointments = appointments.filter((appointment) => appointment.clientId === client.id);
            const upcoming = clientAppointments
              .filter((appointment) => new Date(appointment.dateTime).getTime() >= Date.now())
              .sort(
                (left, right) =>
                  new Date(left.dateTime).getTime() - new Date(right.dateTime).getTime(),
              )[0];

            return (
              <ClientCard
                key={client.id}
                client={client}
                appointmentCount={clientAppointments.length}
                upcomingLabel={upcoming ? formatAppointmentDate(upcoming.dateTime) : undefined}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <Card className="glass-panel">
          <Text fw={600}>No hay clientas que coincidan con esa búsqueda.</Text>
          <Text size="sm" c="dimmed">
            Ajusta el texto para encontrar por nombre, teléfono o referencia de estilo.
          </Text>
        </Card>
      )}
    </Stack>
  );
}
