'use client';

import { Indicator, Stack, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { getCalendarDateKey } from '@/lib/appointments';
import type { Appointment } from '@/types';

interface CalendarViewProps {
  appointments: Appointment[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function CalendarView({ appointments, selectedDate, onDateChange }: CalendarViewProps) {
  const appointmentDays = new Set(appointments.map((appointment) => getCalendarDateKey(appointment.dateTime)));

  return (
    <Stack gap="xs">
      <Calendar
        date={selectedDate}
        onDateChange={(value) => {
          if (value) {
            onDateChange(new Date(value));
          }
        }}
        renderDay={(date) => {
          const hasAppointment = appointmentDays.has(getCalendarDateKey(date));

          return (
            <Indicator size={6} color="bubblegum" offset={-2} disabled={!hasAppointment}>
              {new Date(date).getDate()}
            </Indicator>
          );
        }}
      />
      <Text size="sm" c="dimmed">
        Los puntos marcan días con citas registradas.
      </Text>
    </Stack>
  );
}
