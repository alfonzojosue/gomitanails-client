import { Card, Group, Stack, Text, Title } from '@mantine/core';

interface StatCardProps {
  icon: React.ComponentType<{ size?: number | string; color?: string }>;
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
