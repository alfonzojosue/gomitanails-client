import { Stack, Text, Title } from '@mantine/core';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';
import { appointmentsMock } from '@/mocks/mockData';

export default function CitasPage() {
  return (
    <Stack gap="md">
      <div>
        <Title order={1}>Citas</Title>
        <Text c="dimmed">Listado inicial de citas agendadas.</Text>
      </div>

      {appointmentsMock.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </Stack>
  );
}
