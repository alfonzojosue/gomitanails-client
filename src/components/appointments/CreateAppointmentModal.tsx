'use client';

import { Modal, Stack, Text, Title } from '@mantine/core';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';
import { useAppData } from '@/components/providers/AppDataProvider';

interface CreateAppointmentModalProps {
  opened: boolean;
  onClose: () => void;
}

export function CreateAppointmentModal({ opened, onClose }: CreateAppointmentModalProps) {
  const { addAppointment, clients, services } = useAppData();

  return (
    <Modal opened={opened} onClose={onClose} title="Nueva cita bonita 💖" size="lg">
      <Stack gap="md">
        <div>
          <Title order={3}>Agenda un nuevo set</Title>
          <Text c="dimmed" size="sm">
            Selecciona a tu clienta, define el servicio y guarda referencias del diseño.
          </Text>
        </div>
        <AppointmentForm
          clients={clients}
          services={services}
          onSubmit={(values) => {
            const nextAppointment = addAppointment(values);

            if (nextAppointment) {
              onClose();
            }
          }}
        />
      </Stack>
    </Modal>
  );
}
