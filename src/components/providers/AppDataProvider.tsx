'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
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

interface AppDataStore {
  appointments: Appointment[];
  clients: Client[];
}

const AppDataContext = createContext<AppDataContextValue | null>(null);
const STORAGE_KEY = 'gomita-nails-app-data';
const defaultStore: AppDataStore = {
  appointments: sortAppointmentsByDate(appointmentsMock),
  clients: clientsMock,
};

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildClient(input: CreateClientInput): Client {
  return {
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
}

function readInitialStore() {
  if (typeof window === 'undefined') {
    return defaultStore;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return defaultStore;
    }

    const parsedValue = JSON.parse(storedValue) as Partial<AppDataStore>;

    return {
      appointments: Array.isArray(parsedValue.appointments)
        ? sortAppointmentsByDate(parsedValue.appointments)
        : defaultStore.appointments,
      clients: Array.isArray(parsedValue.clients) ? parsedValue.clients : defaultStore.clients,
    };
  } catch {
    return defaultStore;
  }
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AppDataStore>(readInitialStore);
  const storeRef = useRef(store);

  useEffect(() => {
    storeRef.current = store;
  }, [store]);

  const commitStore = useCallback((nextStore: AppDataStore) => {
    storeRef.current = nextStore;
    setStore(nextStore);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStore));
  }, []);

  const addClient = useCallback(
    (input: CreateClientInput) => {
      const nextClient = buildClient(input);
      const nextStore = {
        ...storeRef.current,
        clients: [...storeRef.current.clients, nextClient],
      };

      commitStore(nextStore);

      return nextClient;
    },
    [commitStore],
  );

  const addAppointment = useCallback(
    (input: CreateAppointmentInput) => {
      const service = servicesMock.find((item) => item.id === input.serviceId);

      if (!service) {
        return null;
      }

      const currentStore = storeRef.current;
      const selectedClient = input.newClient
        ? buildClient(input.newClient)
        : currentStore.clients.find((item) => item.id === input.clientId);

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

      const nextStore = {
        clients: input.newClient
          ? [...currentStore.clients, selectedClient]
          : currentStore.clients,
        appointments: sortAppointmentsByDate([...currentStore.appointments, nextAppointment]),
      };

      commitStore(nextStore);

      return nextAppointment;
    },
    [commitStore],
  );

  const updateAppointmentStatus = useCallback(
    (appointmentId: string, status: AppointmentStatus) => {
      const currentStore = storeRef.current;
      const nextStore = {
        ...currentStore,
        appointments: currentStore.appointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status } : appointment,
        ),
      };

      commitStore(nextStore);
    },
    [commitStore],
  );

  const value = useMemo(
    () => ({
      appointments: store.appointments,
      clients: store.clients,
      services: servicesMock,
      addAppointment,
      addClient,
      updateAppointmentStatus,
    }),
    [addAppointment, addClient, store, updateAppointmentStatus],
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
