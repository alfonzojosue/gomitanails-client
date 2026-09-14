import { Container, Stack, Text, Title } from '@mantine/core';

interface PageContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PageContainer({ title, description, children }: PageContainerProps) {
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>{title}</Title>
          {description ? (
            <Text c="dimmed" mt={4}>
              {description}
            </Text>
          ) : null}
        </div>
        {children}
      </Stack>
    </Container>
  );
}
