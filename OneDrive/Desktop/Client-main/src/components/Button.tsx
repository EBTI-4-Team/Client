import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'white';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
  padding?: string;
  children: ReactNode;
}

const VARIANT_MAP: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-yellow-400 disabled:bg-yellow-200',
  secondary:
    'bg-secondary text-white hover:bg-neutral-700 disabled:bg-neutral-300',
  success: 'bg-success text-white hover:bg-lime-600 disabled:bg-lime-200',
  warning: 'bg-warning text-white hover:bg-orange-400 disabled:bg-orange-300',
  danger: 'bg-danger text-white hover:bg-red-700 disabled:bg-red-300',
  white: 'bg-white text-secondary hover:text-neutral-400',
};

export default function Button({
  variant = 'primary',
  width,
  height,
  fontSize,
  padding = '12px 24px',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const inlineStyle: React.CSSProperties = {
    width,
    height,
    fontSize,
    padding,
  };

  return (
    <button
      style={inlineStyle}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 ${VARIANT_MAP[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
