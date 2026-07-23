import type { ReactNode } from 'react';

/**
 * Presentational blocks used inside design-intent MDX pages.
 *
 * These are deliberately simple and self-contained so that a CMS (TinaCMS)
 * can register them as editable templates and non-developers can drop them
 * into a guidance page without writing JSX by hand.
 */

const palette = {
  useBorder: '#2e7d32',
  useBg: '#edf7ed',
  avoidBorder: '#c62828',
  avoidBg: '#fdecea',
  neutralBorder: '#cfd8dc',
};

const cardBase: React.CSSProperties = {
  borderLeft: '4px solid',
  borderRadius: 6,
  padding: '12px 16px',
  margin: '16px 0',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  lineHeight: 1.5,
};

export const WhenToUse = ({ children }: { children: ReactNode }) => (
  <div style={{ ...cardBase, borderColor: palette.useBorder, background: palette.useBg }}>
    <strong>✓ When to use</strong>
    <div>{children}</div>
  </div>
);

export const WhenNotToUse = ({ children }: { children: ReactNode }) => (
  <div style={{ ...cardBase, borderColor: palette.avoidBorder, background: palette.avoidBg }}>
    <strong>✕ When not to use</strong>
    <div>{children}</div>
  </div>
);

/** A side-by-side Do / Don't comparison. */
export const DoDont = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      margin: '16px 0',
    }}
  >
    {children}
  </div>
);

export const Do = ({ children }: { children: ReactNode }) => (
  <div
    style={{ ...cardBase, borderColor: palette.useBorder, background: palette.useBg, margin: 0 }}
  >
    <strong>Do</strong>
    <div>{children}</div>
  </div>
);

export const Dont = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      ...cardBase,
      borderColor: palette.avoidBorder,
      background: palette.avoidBg,
      margin: 0,
    }}
  >
    <strong>Don't</strong>
    <div>{children}</div>
  </div>
);

/** A neutral callout for behaviour notes, related patterns, etc. */
export const Note = ({ title = 'Note', children }: { title?: string; children: ReactNode }) => (
  <div style={{ ...cardBase, borderColor: palette.neutralBorder, background: '#f5f7f8' }}>
    <strong>{title}</strong>
    <div>{children}</div>
  </div>
);
