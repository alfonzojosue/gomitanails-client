import { Button, Card, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconBrush, IconEye, IconSparkles } from '@tabler/icons-react';
import { formatAppointmentDate, formatAppointmentTime, formatCurrency } from '@/lib/appointments';
import type { Appointment } from '@/types';
import { StatusBadge } from '@/components/ui/status-badge';

interface AppointmentCardProps {
  appointment: Appointment;
  onOpenDetail?: (appointment: Appointment) => void;
}

export function AppointmentCard({ appointment, onOpenDetail }: AppointmentCardProps) {
  return (
    <Card className="glass-panel">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Group gap="sm" align="flex-start">
            <ThemeIcon size={50} radius="xl" variant="light" color="bubblegum" className="time-badge">
              <Text size="xs" fw={700}>
                {formatAppointmentTime(appointment.dateTime)}
              </Text>
            </ThemeIcon>
            <div>
              <Text fw={700}>{appointment.clientName}</Text>
              <Group gap="xs" mt={4}>
                <StatusBadge status={appointment.status} />
                <Text size="sm" c="dimmed">
                  {formatAppointmentDate(appointment.dateTime)}
                </Text>
              </Group>
            </div>
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
              Cita registrada en agenda de estudio.
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

        <Group justify="flex-end">
          <Button
            variant="light"
            color="lavender"
            leftSection={<IconEye size={16} />}
            onClick={() => onOpenDetail?.(appointment)}
          >
            Ver detalle
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
