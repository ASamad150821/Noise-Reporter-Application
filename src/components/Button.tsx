import { ButtonHTMLAttributes, ReactNode } from 'react';

/*
 * A small reusable button component.
 *
 * Notice how we extend ButtonHTMLAttributes<HTMLButtonElement> — this
 * means our Button accepts every prop a native <button> accepts
 * (onClick, disabled, type, aria-label, etc.) plus our extras.
 *
 * This "extend the native element's props" pattern is extremely common
 * in real React codebases.
 */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'px-4 py-2 rounded font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';
  const styles =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
