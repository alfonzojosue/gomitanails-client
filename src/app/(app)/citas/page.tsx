'use client';

import { useMemo, useState } from 'react';
import { Card, Group, Select, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconCalendarEvent } from '@tabler/icons-react';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { NewAppointmentButton } from '@/components/appointments/NewAppointmentButton';
import { useAppData } from '@/components/providers/AppDataProvider';
import { isSameCalendarDay } from '@/lib/appointments';
import type { AppointmentStatus } from '@/types';

const statusOptions = [
  { label: 'Todos los estados', value: 'ALL' },
  { label: 'Pendiente', value: 'PENDIENTE' },
  { label: 'Confirmada', value: 'CONFIRMADA' },
  { label: 'Completada', value: 'COMPLETADA' },
  { label: 'Cancelada', value: 'CANCELADA' },
];

export default function CitasPage() {
  const { appointments } = useAppData();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredAppointments = useMemo(
    () =>
      appointments.filter((appointment) => {
        const matchesDate = selectedDate ? isSameCalendarDay(appointment.dateTime, selectedDate) : true;
        const matchesStatus =
          selectedStatus === 'ALL' ? true : appointment.status === (selectedStatus as AppointmentStatus);

        return matchesDate && matchesStatus;
      }),
    [appointments, selectedDate, selectedStatus],
  );

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <div>
          <Title order={1}>Agenda / Citas</Title>
          <Text c="dimmed">Filtra por fecha o estado y revisa el moodboard de cada diseño.</Text>
        </div>
        <NewAppointmentButton />
      </Group>

      <Card className="glass-panel">
        <Group grow align="flex-end">
          <TextInput
            label="Filtrar por fecha"
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.currentTarget.value)}
            leftSection={<IconCalendarEvent size={16} />}
          />
          <Select
            label="Filtrar por estado"
            data={statusOptions}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value ?? 'ALL')}
          />
        </Group>
      </Card>

      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))
      ) : (
        <Card className="glass-panel">
          <Text fw={600}>No encontramos citas con esos filtros.</Text>
          <Text size="sm" c="dimmed">
            Prueba con otra fecha o abre una nueva cita para mantener la agenda llena.
          </Text>
        </Card>
      )}
    </Stack>
  );
}
