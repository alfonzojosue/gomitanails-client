'use client';

import { Indicator, Stack, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { getCalendarDateKey } from '@/lib/appointments';
import type { Appointment } from '@/types';

interface CalendarViewProps {
  appointments: Appointment[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function CalendarView({ appointments, selectedDate, onDateChange }: CalendarViewProps) {
  const appointmentDays = new Set(appointments.map((appointment) => getCalendarDateKey(appointment.dateTime)));

  return (
    <Stack gap="xs">
      <DatePicker
        value={selectedDate}
        onChange={(value) => {
          if (value) {
            onDateChange(value);
          }
        }}
        renderDay={(date) => {
          const hasAppointment = appointmentDays.has(getCalendarDateKey(date));
          const parsedDate = new Date(date);

          return (
            <Indicator size={6} color="bubblegum" offset={-2} disabled={!hasAppointment}>
              <div>{parsedDate.getDate()}</div>
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
