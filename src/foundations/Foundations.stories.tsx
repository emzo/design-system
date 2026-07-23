import type { Meta, StoryObj } from '@storybook/react-vite';

import { tokens } from '../theme';

// Living documentation of the design tokens (see /tokens). These render straight
// from the generated token values, so they never drift from what components use.
const meta = {
  title: 'Foundations',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ width: 140 }}>
    <div
      style={{
        height: 56,
        borderRadius: tokens.radius.sm,
        background: value,
        border: `1px solid ${tokens.color.neutral.border}`,
      }}
    />
    <div style={{ fontSize: tokens.font.size.sm, marginTop: 6 }}>
      <div style={{ fontWeight: tokens.font.weight.semibold }}>{name}</div>
      <code>{value}</code>
    </div>
  </div>
);

export const Colours: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.space.md }}>
      <Swatch name="primary" value={tokens.color.primary.main} />
      <Swatch name="secondary" value={tokens.color.secondary.main} />
      <Swatch name="success" value={tokens.color.success.main} />
      <Swatch name="error" value={tokens.color.error.main} />
      <Swatch name="neutral.border" value={tokens.color.neutral.border} />
      <Swatch name="neutral.bg" value={tokens.color.neutral.bg} />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.space.sm }}>
      {Object.entries(tokens.space).map(([name, value]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: tokens.space.md }}>
          <code style={{ width: 80 }}>
            {name} ({value})
          </code>
          <div style={{ height: 16, width: value, background: tokens.color.primary.main }} />
        </div>
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: tokens.space.lg }}>
      {Object.entries(tokens.radius).map(([name, value]) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <div
            style={{
              height: 72,
              width: 72,
              borderRadius: value,
              background: tokens.color.secondary.main,
            }}
          />
          <code>
            {name} ({value})
          </code>
        </div>
      ))}
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ fontFamily: tokens.font.family.base }}>
      {Object.entries(tokens.font.size).map(([name, value]) => (
        <p key={name} style={{ fontSize: value, margin: `${tokens.space.sm}px 0` }}>
          {name} — The quick brown fox ({value})
        </p>
      ))}
      <p style={{ fontWeight: tokens.font.weight.regular }}>Regular weight (400)</p>
      <p style={{ fontWeight: tokens.font.weight.semibold }}>Semibold weight (600)</p>
    </div>
  ),
};
