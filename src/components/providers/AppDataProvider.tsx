'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { appointmentsMock, clientsMock, servicesMock } from '@/mocks/mockData';
import { sortAppointmentsByDate } from '@/lib/appointments';
import type {
  Appointment,
  AppointmentStatus,
  Client,
  CreateAppointmentInput,
  CreateClientInput,
  Service,
} from '@/types';

interface AppDataContextValue {
  appointments: Appointment[];
  clients: Client[];
  services: Service[];
  addAppointment: (input: CreateAppointmentInput) => Appointment | null;
  addClient: (input: CreateClientInput) => Client;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useLocalStorage<Client[]>({
    key: 'gomita-nails-clients',
    defaultValue: clientsMock,
  });
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>({
    key: 'gomita-nails-appointments',
    defaultValue: appointmentsMock,
  });

  const addClient = (input: CreateClientInput) => {
    const nextClient: Client = {
      id: createId('cli'),
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email?.trim() || undefined,
      notes: input.notes?.trim() || 'Cliente registrada desde agenda rápida.',
      allergies: input.allergies?.filter(Boolean) ?? [],
      preferredLength: input.preferredLength?.trim() || 'Por definir',
      preferredShape: input.preferredShape?.trim() || 'Por definir',
      nailNotes: input.nailNotes?.trim() || 'Sin notas de uñas registradas aún.',
      favoriteStyle: input.favoriteStyle?.trim() || 'Estilo por descubrir ✨',
    };

    setClients((currentClients) => [...currentClients, nextClient]);

    return nextClient;
  };

  const addAppointment = (input: CreateAppointmentInput) => {
    const service = servicesMock.find((item) => item.id === input.serviceId);

    if (!service) {
      return null;
    }

    const selectedClient = input.newClient
      ? addClient(input.newClient)
      : clients.find((item) => item.id === input.clientId);

    if (!selectedClient) {
      return null;
    }

    const nextAppointment: Appointment = {
      id: createId('apt'),
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      dateTime: input.dateTime,
      status: input.status ?? 'PENDIENTE',
      designNotes: input.designNotes.trim(),
    };

    setAppointments((currentAppointments) =>
      sortAppointmentsByDate([...currentAppointments, nextAppointment]),
    );

    return nextAppointment;
  };

  const updateAppointmentStatus = (appointmentId: string, status: AppointmentStatus) => {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status } : appointment,
      ),
    );
  };

  const value = useMemo(
    () => ({
      appointments: sortAppointmentsByDate(appointments),
      clients,
      services: servicesMock,
      addAppointment,
      addClient,
      updateAppointmentStatus,
    }),
    [appointments, clients],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error('useAppData debe usarse dentro de AppDataProvider');
  }

  return context;
}
