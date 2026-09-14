export type AppointmentStatus = 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA';

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes: string;
  allergies: string[];
  preferredLength: string;
  preferredShape: string;
  nailNotes: string;
  favoriteStyle: string;
}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  dateTime: string;
  status: AppointmentStatus;
  designNotes: string;
}

export interface CreateClientInput {
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  allergies?: string[];
  preferredLength?: string;
  preferredShape?: string;
  nailNotes?: string;
  favoriteStyle?: string;
}

export interface CreateAppointmentInput {
  clientId?: string;
  serviceId: string;
  dateTime: string;
  designNotes: string;
  status?: AppointmentStatus;
  newClient?: CreateClientInput;
}

export interface MockSession {
  email: string;
  displayName: string;
  isAuthenticated: true;
}

export interface LoginActionState {
  error?: string;
}
