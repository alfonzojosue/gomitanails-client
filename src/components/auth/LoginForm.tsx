'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconHeart, IconSparkles, IconStars } from '@tabler/icons-react';
import { login } from '@/app/(auth)/login/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      fullWidth
      type="submit"
      size="md"
      loading={pending}
      variant="gradient"
      gradient={{ from: 'bubblegum.5', to: 'lavender.5', deg: 135 }}
    >
      Entrar al estudio
    </Button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState(login, undefined);

  return (
    <Card maw={460} mx="auto" className="glass-panel" p="xl">
      <Stack gap="lg">
        <Stack gap="xs" align="center">
          <ThemeIcon
            size={64}
            radius="xl"
            variant="gradient"
            gradient={{ from: 'bubblegum.5', to: 'lavender.4', deg: 135 }}
          >
            <IconSparkles size={32} />
          </ThemeIcon>
          <Badge color="bubblegum" variant="light" leftSection={<IconHeart size={12} />}>
            Estética K-Nail / Y2K
          </Badge>
          <Title order={1} ta="center">
            Gomita Nails
          </Title>
          <Text c="dimmed" ta="center">
            Inicia sesión para revisar tu agenda, tus clientas y todos los diseños cute del día.
          </Text>
        </Stack>

        <form action={action}>
          <Stack gap="md">
            <TextInput
              required
              name="email"
              type="email"
              label="Email"
              placeholder="hola@gomitanails.mx"
              leftSection={<IconStars size={16} />}
            />
            <PasswordInput
              required
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              leftSection={<IconHeart size={16} />}
            />
            {state?.error ? <Alert color="rose">{state.error}</Alert> : null}
            <SubmitButton />
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
