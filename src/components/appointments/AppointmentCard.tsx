import { Badge, Button, Card, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconBrush, IconChecks, IconClockHeart, IconSparkles } from '@tabler/icons-react';
import { appointmentStatusMeta, formatAppointmentDate, formatAppointmentTime, formatCurrency } from '@/lib/appointments';
import type { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onComplete?: (appointmentId: string) => void;
}

export function AppointmentCard({ appointment, onComplete }: AppointmentCardProps) {
  const status = appointmentStatusMeta[appointment.status];

  return (
    <Card className="glass-panel">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Group gap="sm" align="flex-start">
            <ThemeIcon
              size={54}
              radius="xl"
              variant="light"
              color="bubblegum"
              className="time-badge"
            >
              <Stack gap={0} align="center">
                <IconClockHeart size={18} />
                <Text size="xs" fw={700} lh={1.1}>
                  {formatAppointmentTime(appointment.dateTime)}
                </Text>
              </Stack>
            </ThemeIcon>
            <Stack gap={4}>
              <Text fw={700} size="lg">
                {appointment.clientName}
              </Text>
              <Group gap="xs">
                <Badge color={status.color}>{status.label}</Badge>
                <Badge color="lavender" variant="light">
                  {formatAppointmentDate(appointment.dateTime)}
                </Badge>
              </Group>
            </Stack>
          </Group>
          <Text fw={700} c="rose.7">
            {formatCurrency(appointment.servicePrice)}
          </Text>
        </Group>

        <Group gap="xs" wrap="nowrap" align="flex-start">
          <IconBrush size={18} color="var(--mantine-color-bubblegum-6)" />
          <div>
            <Text fw={600}>{appointment.serviceName}</Text>
            <Text size="sm" c="dimmed">
              Set reservado con estilo limpio, glossy y ultra cute.
            </Text>
          </div>
        </Group>

        <Card bg="rgba(255, 240, 245, 0.85)" padding="md" radius="xl" shadow="xs" withBorder={false}>
          <Group gap="xs" align="flex-start" wrap="nowrap">
            <IconSparkles size={18} color="var(--mantine-color-rose-6)" />
            <div>
              <Text size="sm" fw={700}>
                Notas del diseño
              </Text>
              <Text size="sm">{appointment.designNotes}</Text>
            </div>
          </Group>
        </Card>

        {appointment.status === 'CONFIRMADA' && onComplete ? (
          <Group justify="flex-end">
            <Button
              variant="light"
              color="mint"
              leftSection={<IconChecks size={16} />}
              onClick={() => onComplete(appointment.id)}
            >
              Marcar completada
            </Button>
          </Group>
        ) : null}
      </Stack>
    </Card>
  );
}
