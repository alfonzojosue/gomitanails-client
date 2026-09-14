'use client';

import { Box, Button, Group, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoutButton } from '@/components/auth/logout-button';

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Citas', href: '/citas' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Servicios', href: '/servicios' },
];

interface NavbarProps {
  email: string;
}

export function Navbar({ email }: NavbarProps) {
  const pathname = usePathname();

  return (
    <Paper className="glass-panel" p="md" radius="xl" component="header">
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <Text fw={800}>Gomita Nails 💅</Text>

        <Group gap="xs" style={{ flex: 1, justifyContent: 'center' }}>
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                radius="xl"
                size="xs"
                variant={isActive ? 'filled' : 'light'}
                color={isActive ? 'bubblegum' : 'lavender'}
              >
                {item.label}
              </Button>
            );
          })}
        </Group>

        <Group gap="sm">
          <Text size="sm" c="dimmed">
            {email}
          </Text>
          <LogoutButton />
        </Group>
      </Box>
    </Paper>
  );
}
