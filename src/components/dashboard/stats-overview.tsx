import { SimpleGrid } from '@mantine/core';
import type { TablerIconsProps } from '@tabler/icons-react';
import { StatCard } from '@/components/dashboard/stat-card';

interface StatItem {
  icon: React.ComponentType<TablerIconsProps>;
  label: string;
  value: string;
  detail: string;
  color: string;
}

interface StatsOverviewProps {
  stats: StatItem[];
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <SimpleGrid cols={{ base: 1, md: 3 }}>
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </SimpleGrid>
  );
}
