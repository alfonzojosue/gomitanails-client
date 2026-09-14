'use client';

import { useState } from 'react';
import {
  Alert,
  Button,
  Divider,
  Group,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCalendarEvent, IconDeviceFloppy, IconSparkles } from '@tabler/icons-react';
import type { Client, CreateAppointmentInput, Service } from '@/types';

interface AppointmentFormProps {
  clients: Client[];
  services: Service[];
  onSubmit: (values: CreateAppointmentInput) => void;
}

export function AppointmentForm({ clients, services, onSubmit }: AppointmentFormProps) {
  const [clientId, setClientId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(services[0]?.id ?? null);
  const [dateTime, setDateTime] = useState<Date | string | null>(new Date());
  const [designNotes, setDesignNotes] = useState('');
  const [createQuickClient, setCreateQuickClient] = useState(false);
  const [quickClientName, setQuickClientName] = useState('');
  const [quickClientPhone, setQuickClientPhone] = useState('');
  const [quickClientEmail, setQuickClientEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const clientOptions = clients.map((client) => ({
    label: `${client.name} · ${client.phone}`,
    value: client.id,
  }));

  const serviceOptions = services.map((service) => ({
    label: `${service.name} · $${service.price}`,
    value: service.id,
  }));

  const resetForm = () => {
    setClientId(null);
    setServiceId(services[0]?.id ?? null);
    setDateTime(new Date());
    setDesignNotes('');
    setCreateQuickClient(false);
    setQuickClientName('');
    setQuickClientPhone('');
    setQuickClientEmail('');
    setError(null);
  };

  const handleSubmit = () => {
    if (!serviceId || !dateTime) {
      setError('Selecciona un servicio y una fecha válida.');
      return;
    }

    if (!createQuickClient && !clientId) {
      setError('Selecciona una clienta existente o activa el alta rápida.');
      return;
    }

    if (createQuickClient && (!quickClientName.trim() || !quickClientPhone.trim())) {
      setError('Para la clienta rápida, agrega al menos nombre y teléfono.');
      return;
    }

    onSubmit({
      clientId: createQuickClient ? undefined : clientId ?? undefined,
      serviceId,
      dateTime: new Date(dateTime).toISOString(),
      designNotes: designNotes.trim() || 'Inspiración a definir en el estudio.',
      status: 'PENDIENTE',
      newClient: createQuickClient
        ? {
            name: quickClientName,
            phone: quickClientPhone,
            email: quickClientEmail || undefined,
            notes: 'Cliente creada desde la agenda rápida.',
            nailNotes: 'Pendiente de definir estilo y largo favorito.',
            preferredLength: 'Por definir',
            preferredShape: 'Por definir',
            favoriteStyle: 'Primer set en construcción ✨',
          }
        : undefined,
    });

    resetForm();
  };

  return (
    <Stack gap="md">
      <Select
        searchable
        clearable={!createQuickClient}
        disabled={createQuickClient}
        label="Clienta"
        placeholder="Busca por nombre o teléfono"
        data={clientOptions}
        value={clientId}
        onChange={setClientId}
        leftSection={<IconSparkles size={16} />}
        nothingFoundMessage="Sin coincidencias"
      />

      <Switch
        checked={createQuickClient}
        onChange={(event) => setCreateQuickClient(event.currentTarget.checked)}
        color="bubblegum"
        label="Crear clienta rápida"
      />

      {createQuickClient ? (
        <Stack gap="sm">
          <Divider label="Alta rápida" labelPosition="center" />
          <TextInput
            required
            label="Nombre"
            placeholder="Sofi Glitter"
            value={quickClientName}
            onChange={(event) => setQuickClientName(event.currentTarget.value)}
          />
          <TextInput
            required
            label="Teléfono"
            placeholder="+52 55 1234 5678"
            value={quickClientPhone}
            onChange={(event) => setQuickClientPhone(event.currentTarget.value)}
          />
          <TextInput
            label="Email (opcional)"
            placeholder="sofi@example.com"
            value={quickClientEmail}
            onChange={(event) => setQuickClientEmail(event.currentTarget.value)}
          />
        </Stack>
      ) : null}

      <Select
        searchable
        label="Servicio"
        data={serviceOptions}
        value={serviceId}
        onChange={setServiceId}
        nothingFoundMessage="Sin coincidencias"
      />

      <DateTimePicker
        required
        label="Fecha y hora"
        value={dateTime}
        onChange={(value) => setDateTime(value)}
        leftSection={<IconCalendarEvent size={16} />}
        minDate={new Date()}
      />

      <Textarea
        label="Notas del diseño"
        placeholder="Lleva dijes 3D de ositos, efecto espejo rosa, aura jelly..."
        minRows={3}
        autosize
        value={designNotes}
        onChange={(event) => setDesignNotes(event.currentTarget.value)}
      />

      {error ? <Alert color="rose">{error}</Alert> : null}

      <Group justify="space-between" align="center">
        <Text size="sm" c="dimmed">
          Las nuevas citas se guardan al instante en la agenda mock local.
        </Text>
        <Button leftSection={<IconDeviceFloppy size={16} />} onClick={handleSubmit}>
          Guardar cita
        </Button>
      </Group>
    </Stack>
  );
}
