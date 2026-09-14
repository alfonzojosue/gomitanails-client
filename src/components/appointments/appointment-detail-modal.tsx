'use client';

import { Anchor, Modal, Select, Stack, Text } from '@mantine/core';
import { formatAppointmentDate, formatAppointmentTime } from '@/lib/appointments';
import type { Appointment, AppointmentStatus } from '@/types';
import { StatusBadge } from '@/components/ui/status-badge';

const statusOptions: { label: string; value: AppointmentStatus }[] = [
  { label: 'PENDIENTE', value: 'PENDIENTE' },
  { label: 'CONFIRMADA', value: 'CONFIRMADA' },
  { label: 'COMPLETADA', value: 'COMPLETADA' },
  { label: 'CANCELADA', value: 'CANCELADA' },
];

function isAppointmentStatus(value: string): value is AppointmentStatus {
  return statusOptions.some((statusOption) => statusOption.value === value);
}

interface AppointmentDetailModalProps {
  appointment: Appointment | null;
  clientPhone?: string;
  opened: boolean;
  onClose: () => void;
  onStatusChange: (appointmentId: string, status: AppointmentStatus) => void;
}

export function AppointmentDetailModal({
  appointment,
  clientPhone,
  opened,
  onClose,
  onStatusChange,
}: AppointmentDetailModalProps) {
  const whatsappPhone = (clientPhone ?? '').replace(/[^\d]/g, '');

  return (
    <Modal opened={opened} onClose={onClose} title="Detalle de cita" size="lg">
      {appointment ? (
        <Stack gap="sm">
          <Text fw={700}>{appointment.clientName}</Text>
          <Text size="sm">
            Teléfono:{' '}
            {whatsappPhone ? (
              <Anchor href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer">
                {clientPhone}
              </Anchor>
            ) : (
              clientPhone ?? 'Sin teléfono registrado'
            )}
          </Text>
          <Text size="sm">Servicio: {appointment.serviceName}</Text>
          <Text size="sm">
            Horario: {formatAppointmentDate(appointment.dateTime)} · {formatAppointmentTime(appointment.dateTime)}
          </Text>
          <Text size="sm">Notas de diseño: {appointment.designNotes}</Text>
          <StatusBadge status={appointment.status} />
          <Select
            label="Cambiar estado"
            data={statusOptions}
            value={appointment.status}
            onChange={(value) => {
              if (value && isAppointmentStatus(value)) {
                onStatusChange(appointment.id, value);
              }
            }}
          />
        </Stack>
      ) : null}
    </Modal>
  );
}
