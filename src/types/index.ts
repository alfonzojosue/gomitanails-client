export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes: string;
}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  dateTime: string;
  status: 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA';
}
