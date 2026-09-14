import { Center, Container, Stack, Text } from '@mantine/core';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { getMockSession } from '@/lib/auth';

export default async function LoginPage() {
  const session = await getMockSession();

  if (session) {
    redirect('/');
  }

  return (
    <Container size="sm" py="xl">
      <Center mih="100dvh">
        <Stack gap="xl" w="100%">
          <div>
            <Text ta="center" c="dimmed">
              Beauty dashboard para tu agenda, clientas y servicios más kawaii.
            </Text>
          </div>
          <LoginForm />
        </Stack>
      </Center>
    </Container>
  );
}
