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

const dateKeyFormatter = new Intl.DateTimeFormat('en-US', {
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

function pad(value: number) {
  return value.toString().padStart(2, '0');
}

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
  const date = new Date(value);
  const parts = dateKeyFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const day = parts.find((part) => part.type === 'day')?.value;

  return `${year}-${month}-${day}`;
}

export function isSameCalendarDay(dateTime: string, selectedDate: Date | string) {
  const comparisonKey =
    typeof selectedDate === 'string' ? selectedDate : getCalendarDateKey(selectedDate);

  return getCalendarDateKey(dateTime) === comparisonKey;
}

export function serializeLocalDateTime(value: Date | string) {
  const normalizedValue = typeof value === 'string' ? value.replace(' ', 'T') : value;
  const date = normalizedValue instanceof Date ? normalizedValue : new Date(normalizedValue);
  const timezoneOffsetMinutes = -date.getTimezoneOffset();
  const sign = timezoneOffsetMinutes >= 0 ? '+' : '-';
  const absoluteOffset = Math.abs(timezoneOffsetMinutes);
  const offsetHours = pad(Math.floor(absoluteOffset / 60));
  const offsetMinutes = pad(absoluteOffset % 60);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${offsetHours}:${offsetMinutes}`;
}

export function sortAppointmentsByDate(appointments: Appointment[]) {
  return [...appointments].sort(
    (left, right) => new Date(left.dateTime).getTime() - new Date(right.dateTime).getTime(),
  );
}
