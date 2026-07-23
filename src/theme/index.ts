import { createTheme, type Theme } from '@mui/material/styles';

import { tokens } from './tokens';

export { tokens } from './tokens';
export type { Tokens } from './tokens';

export type ThemeMode = 'light' | 'dark';

/**
 * Builds the design-system MUI theme from design tokens (see `/tokens`).
 * Consuming apps wrap themselves in this:
 *
 *   import { ThemeProvider } from '@mui/material/styles';
 *   import { theme } from '@emzo/design-system/theme';
 *
 *   <ThemeProvider theme={theme}>...</ThemeProvider>
 */
export const getTheme = (mode: ThemeMode = 'light'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: { main: tokens.color.primary.main },
      secondary: { main: tokens.color.secondary.main },
      success: { main: tokens.color.success.main },
      error: { main: tokens.color.error.main },
    },
    shape: { borderRadius: tokens.radius.md },
    spacing: tokens.space.sm,
    typography: {
      fontFamily: tokens.font.family.base,
      button: { textTransform: 'none', fontWeight: tokens.font.weight.semibold },
    },
  });

export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');

/** Default theme (light). */
export const theme = lightTheme;

export default theme;
