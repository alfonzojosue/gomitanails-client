import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { logout } from '@/app/(auth)/login/actions';

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="light"
        color="rose"
        leftSection={<IconLogout size={16} />}
      >
        Cerrar sesión
      </Button>
    </form>
  );
}
