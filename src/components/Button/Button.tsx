import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  /** Visual hierarchy of the button */
  variant?: ButtonVariant;
  /** Button contents */
  label: string;
  /** Size of the button */
  size?: ButtonSize;
  /** Disable the button */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

// Maps our design-system variants onto Material UI v5's Button API.
const MUI_VARIANT: Record<ButtonVariant, MuiButtonProps['variant']> = {
  primary: 'contained',
  secondary: 'outlined',
  tertiary: 'text',
};

/**
 * Primary UI component for user actions, built on top of Material UI v5.
 */
export const Button = ({
  variant = 'primary',
  label,
  size = 'medium',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <MuiButton
      variant={MUI_VARIANT[variant]}
      color="primary"
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </MuiButton>
  );
};
