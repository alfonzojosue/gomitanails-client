'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, SimpleGrid, Stack, Text } from '@mantine/core';
import { ClientCard } from '@/components/clients/client-card';
import { ClientSearchBar } from '@/components/clients/client-search-bar';
import { Navbar } from '@/components/layout/navbar';
import { PageContainer } from '@/components/layout/page-container';
import { useAppData } from '@/components/providers/app-data-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { formatAppointmentDate } from '@/lib/appointments';

export default function ClientesPage() {
  const router = useRouter();
  const { appointments, clients } = useAppData();
  const { isAuthenticated, session } = useAuth();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !session) {
      router.replace('/login');
    }
  }, [isAuthenticated, router, session]);

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

  const appointmentsByClient = useMemo(() => {
    const groupedAppointments = new Map<string, typeof appointments>();

    appointments.forEach((appointment) => {
      const clientAppointments = groupedAppointments.get(appointment.clientId) ?? [];
      groupedAppointments.set(appointment.clientId, [...clientAppointments, appointment]);
    });

    return groupedAppointments;
  }, [appointments]);

  if (!isAuthenticated || !session) return null;

  return (
    <Stack gap="md">
      <Navbar email={session.email} />
      <PageContainer
        title="Clientes"
        description="Cartera de clientas con búsqueda, notas, alergias y próximos servicios."
      >
        <Card className="glass-panel">
          <ClientSearchBar value={search} onChange={setSearch} />
        </Card>

        {filteredClients.length > 0 ? (
          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            {filteredClients.map((client) => {
              const clientAppointments = appointmentsByClient.get(client.id) ?? [];
              const upcoming = clientAppointments
                .filter((appointment) => new Date(appointment.dateTime).getTime() >= Date.now())
                .sort(
                  (left, right) => new Date(left.dateTime).getTime() - new Date(right.dateTime).getTime(),
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
      </PageContainer>
    </Stack>
  );
}
