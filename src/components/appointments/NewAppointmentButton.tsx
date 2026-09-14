'use client';

import { Button, type ButtonProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { CreateAppointmentModal } from '@/components/appointments/CreateAppointmentModal';

interface NewAppointmentButtonProps extends ButtonProps {
  label?: string;
}

export function NewAppointmentButton({ label = '+ Nueva cita', ...buttonProps }: NewAppointmentButtonProps) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button
        leftSection={<IconPlus size={16} />}
        variant="gradient"
        gradient={{ from: 'bubblegum.5', to: 'lavender.5', deg: 135 }}
        onClick={open}
        {...buttonProps}
      >
        {label}
      </Button>
      <CreateAppointmentModal opened={opened} onClose={close} />
    </>
  );
}
