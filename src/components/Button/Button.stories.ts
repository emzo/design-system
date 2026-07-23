import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';

// Component-implementation stories: the live component, its variants and its API.
// This is developer-owned documentation — the CMS never touches these files.
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onClick: fn(), label: 'Button' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', label: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', label: 'Tertiary' },
};

export const Large: Story = {
  args: { size: 'large', label: 'Large button' },
};

export const Small: Story = {
  args: { size: 'small', label: 'Small button' },
};
