'use client';

import { Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconCalendarEvent, IconCoins, IconHeartHandshake, IconSparkles } from '@tabler/icons-react';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { NewAppointmentButton } from '@/components/appointments/NewAppointmentButton';
import { useAppData } from '@/components/providers/AppDataProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { formatCurrency, isSameCalendarDay } from '@/lib/appointments';

export default function HomePage() {
  const { appointments, updateAppointmentStatus } = useAppData();
  const { session } = useAuth();

  const today = new Date();
  const todayAppointments = appointments.filter((appointment) =>
    isSameCalendarDay(appointment.dateTime, today),
  );
  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.dateTime).getTime() >= today.getTime(),
  );
  const dayRevenue = todayAppointments
    .filter((appointment) => appointment.status !== 'CANCELADA')
    .reduce((total, appointment) => total + appointment.servicePrice, 0);
  const upcomingClients = upcomingAppointments.slice(0, 3).map((appointment) => appointment.clientName);

  const stats = [
    {
      icon: IconCalendarEvent,
      label: 'Citas de hoy',
      value: todayAppointments.length.toString(),
      detail: `${todayAppointments.filter((item) => item.status === 'CONFIRMADA').length} confirmadas`,
      color: 'bubblegum',
    },
    {
      icon: IconCoins,
      label: 'Ingresos del día',
      value: formatCurrency(dayRevenue),
      detail: 'Calculado con la agenda activa',
      color: 'mint',
    },
    {
      icon: IconHeartHandshake,
      label: 'Próximos clientes',
      value: upcomingClients.length ? upcomingClients.join(', ') : 'Sin próximas citas',
      detail: 'Tus siguientes beauty dates',
      color: 'lavender',
    },
  ];

  return (
    <Stack gap="xl">
      <Card className="glass-panel" p="xl">
        <Group justify="space-between" align="center">
          <div>
            <Group gap="xs" mb="xs">
              <IconSparkles size={22} color="var(--mantine-color-bubblegum-6)" />
              <Text fw={700} c="bubblegum.7">
                Beauty dashboard
              </Text>
            </Group>
            <Title order={1}>¡Hola, {session?.displayName ?? 'Gomita Nails'}! 💅✨</Title>
            <Text c="dimmed" mt={6}>
              Hoy tienes una agenda llena de color, brillo y sets listos para enamorar.
            </Text>
          </div>
          <NewAppointmentButton />
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, md: 3 }}>
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-panel">
            <Stack gap="sm">
              <Group justify="space-between" align="center">
                <Text c="dimmed">{stat.label}</Text>
                <stat.icon size={18} color={`var(--mantine-color-${stat.color}-6)`} />
              </Group>
              <Title order={3}>{stat.value}</Title>
              <Text size="sm" c="dimmed">
                {stat.detail}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      <Stack gap="md">
        <div>
          <Title order={2}>Agenda del día</Title>
          <Text c="dimmed">Cambia rápido una cita confirmada a completada cuando cierres el servicio.</Text>
        </div>

        {todayAppointments.length > 0 ? (
          todayAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onComplete={(appointmentId) =>
                updateAppointmentStatus(appointmentId, 'COMPLETADA')
              }
            />
          ))
        ) : (
          <Card className="glass-panel">
            <Text fw={600}>No hay citas para hoy.</Text>
            <Text c="dimmed" size="sm">
              Abre una nueva cita para comenzar a llenar la agenda de diseños soñados.
            </Text>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}
