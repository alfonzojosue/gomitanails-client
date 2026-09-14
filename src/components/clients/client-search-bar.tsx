import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface ClientSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ClientSearchBar({ value, onChange }: ClientSearchBarProps) {
  return (
    <TextInput
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      label="Buscar clientes"
      placeholder="Andrea, chrome rose, +52..."
      leftSection={<IconSearch size={16} />}
    />
  );
}
