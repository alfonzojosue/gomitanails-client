'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { CalendarView } from '@/components/appointments/calendar-view';
import { AppointmentCard } from '@/components/appointments/appointment-card';
import { AppointmentDetailModal } from '@/components/appointments/appointment-detail-modal';
import { NewAppointmentModal } from '@/components/appointments/new-appointment-modal';
import { Navbar } from '@/components/layout/navbar';
import { PageContainer } from '@/components/layout/page-container';
import { useAppData } from '@/components/providers/app-data-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { getCalendarDateKey } from '@/lib/appointments';
import type { Appointment } from '@/types';

export default function CitasPage() {
  const router = useRouter();
  const { appointments, clients, updateAppointmentStatus } = useAppData();
  const { isAuthenticated, session } = useAuth();
  const [selectedDate, setSelectedDate] = useState(() => getCalendarDateKey(new Date()));
  const [openedCreate, createModal] = useDisclosure(false);
  const [openedDetail, detailModal] = useDisclosure(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !session) {
      router.replace('/login');
    }
  }, [isAuthenticated, router, session]);

  const filteredAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => getCalendarDateKey(appointment.dateTime) === getCalendarDateKey(selectedDate),
      ),
    [appointments, selectedDate],
  );

  const selectedClient = clients.find((client) => client.id === selectedAppointment?.clientId);

  if (!isAuthenticated || !session) return null;

  return (
    <Stack gap="md">
      <Navbar email={session.email} />
      <PageContainer
        title="Citas"
        description="Calendario mensual con agenda filtrada por día para ver y gestionar citas."
      >
        <Group justify="flex-end">
          <Button
            variant="gradient"
            gradient={{ from: 'bubblegum.5', to: 'lavender.5', deg: 135 }}
            leftSection={<IconPlus size={16} />}
            onClick={createModal.open}
          >
            Nueva cita
          </Button>
        </Group>

        <CalendarView appointments={appointments} selectedDate={selectedDate} onDateChange={setSelectedDate} />

        <Stack gap="md">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onOpenDetail={(nextAppointment) => {
                  setSelectedAppointment(nextAppointment);
                  detailModal.open();
                }}
              />
            ))
          ) : (
            <Card className="glass-panel">
              <Text fw={600}>No hay citas para la fecha seleccionada.</Text>
              <Text size="sm" c="dimmed">
                Elige otro día en el calendario o crea una nueva cita.
              </Text>
            </Card>
          )}
        </Stack>
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
