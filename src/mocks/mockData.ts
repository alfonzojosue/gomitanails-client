import type { Appointment, Client, Service } from '@/types';

export const clientsMock: Client[] = [
  {
    id: 'cli-1',
    name: 'Andrea López',
    phone: '+52 55 1122 3344',
    email: 'andrea.lopez@example.com',
    notes: 'Prefiere tonos nude y diseños discretos.',
  },
  {
    id: 'cli-2',
    name: 'María Fernanda Cruz',
    phone: '+52 55 8899 7766',
    notes: 'Sensible al aroma de acrílico, ventilar área.',
  },
  {
    id: 'cli-3',
    name: 'Daniela Ríos',
    phone: '+52 55 6677 9900',
    email: 'daniela.rios@example.com',
    notes: 'Solicita recordatorio un día antes por WhatsApp.',
  },
];

export const servicesMock: Service[] = [
  {
    id: 'srv-1',
    name: 'Manicure clásica',
    durationMinutes: 45,
    price: 250,
  },
  {
    id: 'srv-2',
    name: 'Gelish',
    durationMinutes: 60,
    price: 380,
  },
  {
    id: 'srv-3',
    name: 'Uñas acrílicas (set completo)',
    durationMinutes: 120,
    price: 700,
  },
];

export const appointmentsMock: Appointment[] = [
  {
    id: 'apt-1',
    clientId: 'cli-1',
    clientName: 'Andrea López',
    serviceId: 'srv-2',
    serviceName: 'Gelish',
    dateTime: '2026-09-15T11:00:00-06:00',
    status: 'CONFIRMADA',
  },
  {
    id: 'apt-2',
    clientId: 'cli-2',
    clientName: 'María Fernanda Cruz',
    serviceId: 'srv-1',
    serviceName: 'Manicure clásica',
    dateTime: '2026-09-15T14:30:00-06:00',
    status: 'PENDIENTE',
  },
  {
    id: 'apt-3',
    clientId: 'cli-3',
    clientName: 'Daniela Ríos',
    serviceId: 'srv-3',
    serviceName: 'Uñas acrílicas (set completo)',
    dateTime: '2026-09-16T10:00:00-06:00',
    status: 'COMPLETADA',
  },
];
