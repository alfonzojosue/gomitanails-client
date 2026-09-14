import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { logout } from '@/app/login/actions';

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="light" color="rose" size="xs" leftSection={<IconLogout size={14} />}>
        Cerrar sesión
      </Button>
    </form>
  );
}
