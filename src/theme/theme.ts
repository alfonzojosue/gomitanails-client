import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'bubblegum',
  defaultRadius: 'xl',
  fontFamily:
    'Inter, ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  colors: {
    bubblegum: [
      '#fff2f7',
      '#ffe0e9',
      '#ffc7d5',
      '#ffb3c1',
      '#ff9ab0',
      '#ff85a1',
      '#ff6f93',
      '#ff5c8a',
      '#ff477e',
      '#f82867',
    ],
    lavender: [
      '#faf3ff',
      '#f3e7ff',
      '#ead3ff',
      '#dfbeff',
      '#d7adff',
      '#ce9cff',
      '#c68bff',
      '#bb74ff',
      '#ae5dff',
      '#9f3cff',
    ],
    cream: [
      '#fffdf8',
      '#fff9ec',
      '#faf0ca',
      '#f7e9bc',
      '#f4dfa8',
      '#f0d592',
      '#eac97d',
      '#dfba66',
      '#d1a04b',
      '#b98537',
    ],
    mint: [
      '#effff7',
      '#dbf9eb',
      '#b7f0d5',
      '#8ee6bf',
      '#68ddab',
      '#53d79f',
      '#43d498',
      '#32bc84',
      '#22a575',
      '#0b8d62',
    ],
    sunshine: [
      '#fffdea',
      '#fff8c4',
      '#fff28f',
      '#ffec5d',
      '#ffe734',
      '#ffe31b',
      '#f9dc0b',
      '#ddc400',
      '#c4ad00',
      '#a89200',
    ],
    rose: [
      '#fff1f4',
      '#ffdde5',
      '#ffc0cf',
      '#ff9aad',
      '#ff738e',
      '#ff5f81',
      '#ff4c74',
      '#f63a68',
      '#dc2457',
      '#bf0f47',
    ],
  },
  shadows: {
    sm: '0 12px 24px rgba(255, 133, 161, 0.14)',
    md: '0 20px 40px rgba(255, 133, 161, 0.18)',
    xl: '0 24px 60px rgba(159, 60, 255, 0.14)',
  },
  headings: {
    fontFamily:
      'Inter, ui-rounded, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        root: {
          boxShadow: '0 14px 28px rgba(255, 133, 161, 0.2)',
          fontWeight: 700,
          transition: 'transform 160ms ease, box-shadow 160ms ease',
        },
        label: {
          letterSpacing: '0.01em',
        },
      },
    },
    Card: {
      defaultProps: {
        padding: 'lg',
        radius: 'xl',
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          borderColor: 'rgba(255, 179, 193, 0.55)',
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 'xl',
        variant: 'light',
      },
      styles: {
        root: {
          fontWeight: 700,
          paddingInline: rem(10),
        },
      },
    },
    Modal: {
      defaultProps: {
        centered: true,
        radius: 'xl',
        overlayProps: { backgroundOpacity: 0.35, blur: 8 },
      },
      styles: {
        content: {
          background: 'rgba(255, 250, 252, 0.96)',
          backdropFilter: 'blur(18px)',
        },
      },
    },
    NavLink: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        root: {
          background: 'rgba(255, 255, 255, 0.72)',
          border: '1px solid rgba(255, 179, 193, 0.45)',
          boxShadow: '0 8px 18px rgba(255, 133, 161, 0.1)',
        },
      },
    },
  },
});
