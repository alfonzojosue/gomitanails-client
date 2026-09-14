import { Card, Stack, Text, Title } from '@mantine/core';
import { AppointmentCard } from '@/components/appointments/appointment-card';
import type { Appointment } from '@/types';

interface TodayAgendaProps {
  appointments: Appointment[];
  onOpenDetail: (appointment: Appointment) => void;
}

export function TodayAgenda({ appointments, onOpenDetail }: TodayAgendaProps) {
  return (
    <Stack gap="md">
      <div>
        <Title order={2}>Agenda del día</Title>
        <Text c="dimmed">Lista compacta de citas del día actual.</Text>
      </div>

      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} onOpenDetail={onOpenDetail} />
        ))
      ) : (
        <Card className="glass-panel">
          <Text fw={600}>No hay citas para hoy.</Text>
          <Text c="dimmed" size="sm">
            Abre una nueva cita para comenzar a llenar la agenda.
          </Text>
        </Card>
      )}
    </Stack>
  );
}
