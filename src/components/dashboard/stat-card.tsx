import { Card, Group, Stack, Text, Title } from '@mantine/core';
import type { TablerIconsProps } from '@tabler/icons-react';

interface StatCardProps {
  icon: React.ComponentType<TablerIconsProps>;
  label: string;
  value: string;
  detail: string;
  color: string;
}

export function StatCard({ icon: Icon, label, value, detail, color }: StatCardProps) {
  return (
    <Card className="glass-panel">
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text c="dimmed">{label}</Text>
          <Icon size={18} color={`var(--mantine-color-${color}-6)`} />
        </Group>
        <Title order={3}>{value}</Title>
        <Text size="sm" c="dimmed">
          {detail}
        </Text>
      </Stack>
    </Card>
  );
}
