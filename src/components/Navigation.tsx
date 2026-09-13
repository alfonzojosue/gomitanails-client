'use client';

import { IconCalendarEvent, IconHome, IconScissors, IconUsers } from '@tabler/icons-react';
import { Group, NavLink } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Inicio', href: '/', icon: IconHome },
  { label: 'Citas', href: '/citas', icon: IconCalendarEvent },
  { label: 'Clientes', href: '/clientes', icon: IconUsers },
  { label: 'Servicios', href: '/servicios', icon: IconScissors },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <Group component="nav" gap="xs" wrap="nowrap" style={{ overflowX: "auto" }}>
      {navItems.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
        <NavLink
          key={item.href}
          component={Link}
          href={item.href}
          label={item.label}
          leftSection={<item.icon size={16} />}
          variant="filled"
          active={isActive}
          aria-current={isActive ? 'page' : undefined}
        />
        );
      })}
    </Group>
  );
}
