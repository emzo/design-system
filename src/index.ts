/**
 * Public API of the design system (the "barrel").
 *
 * Consumers can either import from here — `import { Button } from '@emzo/design-system'`
 * (tree-shaken, so unused components are dropped by the app's bundler) — or import
 * a single component directly via its subpath — `import { Button } from '@emzo/design-system/Button'`.
 */
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { theme, lightTheme, darkTheme, getTheme, tokens } from './theme';
export type { ThemeMode, Tokens } from './theme';
