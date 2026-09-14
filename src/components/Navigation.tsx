'use client';

import {
  IconCalendarEvent,
  IconHome,
  IconScissors,
  IconSparkles,
  IconUsers,
} from '@tabler/icons-react';
import { Group, NavLink } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Inicio', href: '/', icon: IconHome },
  { label: 'Citas', href: '/citas', icon: IconCalendarEvent },
  { label: 'Clientes', href: '/clientes', icon: IconUsers },
  { label: 'Servicios', href: '/servicios', icon: IconScissors },
  { label: 'Mood', href: '/login', icon: IconSparkles, hidden: true },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <Group component="nav" gap="sm" wrap="wrap">
      {navItems
        .filter((item) => !item.hidden)
        .map((item) => {
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
              active={isActive}
              variant={isActive ? 'filled' : 'light'}
              color={isActive ? 'bubblegum' : 'lavender'}
              aria-current={isActive ? 'page' : undefined}
            />
          );
        })}
    </Group>
  );
}
