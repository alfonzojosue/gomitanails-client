import type { Appointment, AppointmentStatus } from '@/types';

export const appointmentStatusMeta: Record<
  AppointmentStatus,
  { color: string; label: string }
> = {
  PENDIENTE: { color: 'sunshine', label: 'Pendiente' },
  CONFIRMADA: { color: 'mint', label: 'Confirmada' },
  COMPLETADA: { color: 'rose', label: 'Completada' },
  CANCELADA: { color: 'gray', label: 'Cancelada' },
};

const calendarKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  day: '2-digit',
  month: '2-digit',
  timeZone: 'America/Mexico_City',
  year: 'numeric',
});

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'medium',
  timeZone: 'America/Mexico_City',
});

const timeFormatter = new Intl.DateTimeFormat('es-MX', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Mexico_City',
});

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  currency: 'MXN',
  style: 'currency',
});

export function formatAppointmentDate(dateTime: string) {
  return dateFormatter.format(new Date(dateTime));
}

export function formatAppointmentTime(dateTime: string) {
  return timeFormatter.format(new Date(dateTime));
}

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

export function getCalendarDateKey(value: Date | string) {
  return calendarKeyFormatter.format(new Date(value));
}

export function isSameCalendarDay(dateTime: string, selectedDate: Date) {
  return getCalendarDateKey(dateTime) === getCalendarDateKey(selectedDate);
}

export function sortAppointmentsByDate(appointments: Appointment[]) {
  return [...appointments].sort(
    (left, right) => new Date(left.dateTime).getTime() - new Date(right.dateTime).getTime(),
  );
}
