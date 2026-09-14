'use client';

import { Button, type ButtonProps } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { CreateAppointmentModal } from '@/components/appointments/CreateAppointmentModal';

interface NewAppointmentButtonProps extends ButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function NewAppointmentButton({
  label = '+ Nueva cita',
  gradient = { from: 'bubblegum.5', to: 'lavender.5', deg: 135 },
  onClick,
  variant = 'gradient',
  ...buttonProps
}: NewAppointmentButtonProps) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <Button
        {...buttonProps}
        leftSection={<IconPlus size={16} />}
        variant={variant}
        gradient={gradient}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            open();
          }
        }}
      >
        {label}
      </Button>
      <CreateAppointmentModal opened={opened} onClose={close} />
    </>
  );
}
