'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconBrush, IconHeart, IconSparkles, IconStars } from '@tabler/icons-react';
import { Navbar } from '@/components/layout/navbar';
import { PageContainer } from '@/components/layout/page-container';
import { useAuth } from '@/components/providers/auth-provider';
import { formatCurrency } from '@/lib/appointments';
import { servicesMock } from '@/mocks/mock-data';

const icons = [IconSparkles, IconBrush, IconHeart, IconStars];

export default function ServiciosPage() {
  const router = useRouter();
  const { isAuthenticated, session } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !session) {
      router.replace('/login');
    }
  }, [isAuthenticated, router, session]);

  if (!isAuthenticated || !session) return null;

  return (
    <Stack gap="md">
      <Navbar email={session.email} />
      <PageContainer title="Servicios" description="Catálogo de servicios y precios base para cada set.">
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {servicesMock.map((service, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Card key={service.id} className="glass-panel">
                <Group justify="space-between" align="flex-start">
                  <Group align="flex-start" gap="sm">
                    <ThemeIcon
                      size={48}
                      radius="xl"
                      variant="gradient"
                      gradient={{ from: 'bubblegum.5', to: 'lavender.4', deg: 135 }}
                    >
                      <Icon size={22} />
                    </ThemeIcon>
                    <div>
                      <Text fw={700}>{service.name}</Text>
                      <Text size="sm" c="dimmed">
                        {service.durationMinutes} min
                      </Text>
                    </div>
                  </Group>
                  <Text fw={700} c="rose.7">
                    {formatCurrency(service.price)}
                  </Text>
                </Group>
                <Text mt="md">{service.description}</Text>
              </Card>
            );
          })}
        </SimpleGrid>
      </PageContainer>
    </Stack>
  );
}
