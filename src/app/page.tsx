'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendarEvent,
  IconCoins,
  IconHeartHandshake,
  IconPlus,
  IconSparkles,
} from '@tabler/icons-react';
import { Navbar } from '@/components/layout/navbar';
import { PageContainer } from '@/components/layout/page-container';
import { StatsOverview } from '@/components/dashboard/stats-overview';
import { TodayAgenda } from '@/components/dashboard/today-agenda';
import { AppointmentDetailModal } from '@/components/appointments/appointment-detail-modal';
import { NewAppointmentModal } from '@/components/appointments/new-appointment-modal';
import { useAppData } from '@/components/providers/app-data-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { formatCurrency, isSameCalendarDay } from '@/lib/appointments';

export default function HomePage() {
  const router = useRouter();
  const { appointments, clients, updateAppointmentStatus } = useAppData();
  const { isAuthenticated, session } = useAuth();
  const [openedCreate, createModal] = useDisclosure(false);
  const [openedDetail, detailModal] = useDisclosure(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !session) {
      router.replace('/login');
    }
  }, [isAuthenticated, router, session]);

  const { dayRevenue, todayAppointments, upcomingClients } = useMemo(() => {
    const today = new Date();
    const nextTodayAppointments = appointments.filter((appointment) =>
      isSameCalendarDay(appointment.dateTime, today),
    );
    const nextUpcomingAppointments = appointments.filter(
      (appointment) => new Date(appointment.dateTime).getTime() >= today.getTime(),
    );
    const sortedUpcomingAppointments = [...nextUpcomingAppointments].sort(
      (left, right) => new Date(left.dateTime).getTime() - new Date(right.dateTime).getTime(),
    );
    const nextDayRevenue = nextTodayAppointments
      .filter((appointment) => appointment.status !== 'CANCELADA')
      .reduce((total, appointment) => total + appointment.servicePrice, 0);
    const uniqueUpcomingClients = sortedUpcomingAppointments.reduce<
      { clientId: string; clientName: string }[]
    >((accumulator, appointment) => {
      if (accumulator.some((client) => client.clientId === appointment.clientId)) {
        return accumulator;
      }

      return [...accumulator, { clientId: appointment.clientId, clientName: appointment.clientName }];
    }, []);
    const nextUpcomingClients = uniqueUpcomingClients.slice(0, 3).map((client) => client.clientName);

    return {
      todayAppointments: nextTodayAppointments,
      dayRevenue: nextDayRevenue,
      upcomingClients: nextUpcomingClients,
    };
  }, [appointments]);

  const stats = useMemo(
    () => [
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
    ],
    [dayRevenue, todayAppointments, upcomingClients],
  );

  const selectedAppointment = appointments.find((appointment) => appointment.id === selectedAppointmentId) ?? null;
  const selectedClient = clients.find((client) => client.id === selectedAppointment?.clientId);

  if (!isAuthenticated || !session) return null;

  return (
    <Stack gap="md">
      <Navbar email={session.email} />
      <PageContainer
        title="Inicio"
        description="Resumen rápido de tu estudio y agenda del día con control de citas."
      >
        <Card className="glass-panel" p="xl">
          <Group justify="space-between" align="center">
            <div>
              <Group gap="xs" mb="xs">
                <IconSparkles size={20} color="var(--mantine-color-bubblegum-6)" />
                <Text fw={700} c="bubblegum.7">
                  Beauty dashboard
                </Text>
              </Group>
              <Text fw={700}>¡Hola, {session.displayName}! 💅✨</Text>
            </div>
            <Button
              variant="gradient"
              gradient={{ from: 'bubblegum.5', to: 'lavender.5', deg: 135 }}
              leftSection={<IconPlus size={16} />}
              onClick={createModal.open}
            >
              Nueva cita
            </Button>
          </Group>
        </Card>

        <StatsOverview stats={stats} />

        <TodayAgenda
          appointments={todayAppointments}
          onOpenDetail={(appointment) => {
            setSelectedAppointmentId(appointment.id);
            detailModal.open();
          }}
        />
      </PageContainer>

      <NewAppointmentModal opened={openedCreate} onClose={createModal.close} />
      <AppointmentDetailModal
        appointment={selectedAppointment}
        clientPhone={selectedClient?.phone}
        opened={openedDetail}
        onClose={detailModal.close}
        onStatusChange={updateAppointmentStatus}
      />
    </Stack>
  );
}
