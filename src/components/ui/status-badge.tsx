import { Badge } from '@mantine/core';
import { appointmentStatusMeta } from '@/lib/appointments';
import type { AppointmentStatus } from '@/types';

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusMeta = appointmentStatusMeta[status];

  return <Badge color={statusMeta.color}>{statusMeta.label}</Badge>;
}
