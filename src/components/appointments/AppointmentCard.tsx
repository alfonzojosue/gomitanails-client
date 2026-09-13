import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import type { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
}

const statusColor: Record<Appointment['status'], string> = {
  PENDIENTE: 'yellow',
  CONFIRMADA: 'blue',
  COMPLETADA: 'green',
  CANCELADA: 'red',
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const formattedDate = new Date(appointment.dateTime).toLocaleString('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  });

  return (
    <Card withBorder radius="md" padding="md">
      <Stack gap={6}>
        <Group justify="space-between" align="flex-start">
          <Text fw={600}>{appointment.clientName}</Text>
          <Badge color={statusColor[appointment.status]}>{appointment.status}</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          {appointment.serviceName}
        </Text>
        <Text size="sm">{formattedDate}</Text>
      </Stack>
    </Card>
  );
}
