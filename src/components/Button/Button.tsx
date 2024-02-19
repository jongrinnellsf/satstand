import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  buttonContent: ReactNode | string;
  type?: HTMLButtonElement['type'];
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant?: 'primary' | 'secondary' | 'sky' | 'blue'; // Add 'custom' as a variant option
  disabled?: boolean;
  icon?: ReactNode;
  rounded?: boolean;
};

export default function Button({
  buttonContent,
  type = 'button',
  className,
  onClick,
  variant = 'primary',
  disabled = false,
  icon,
  rounded = true,
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={clsx(
        'flex w-full items-center justify-center',
        'py-4 text-sm',
        variant === 'primary' ? 'bg-white' : 'bg-black',
        variant === 'secondary' ? 'bg-[#1c1b1b]' : null,
        variant === 'sky' ? 'bg-gradient-to-b from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 active:from-orange-700 active:to-pink-700' : null, // Use top-to-bottom gradient for the 'gray' variant
        variant === 'blue' ? 'bg-[#529CF8] hover:bg-[#417AC4] active:bg-[#2F5890]' : null, // Use #529CF8 for the custom variant
      // Add gray variant styles
        variant === 'primary' ? 'text-black' : 'text-white',
        disabled && variant === 'primary' ? 'bg-gray-400' : null,
        disabled && variant === 'secondary' ? 'bg-boat-color-gray-900' : null,
        rounded ? 'rounded-full' : null,
        className,
      )}
      disabled={disabled}
    >
      {icon ? <span className="mr-2">{icon}</span> : null}
      {buttonContent}
    </button>
  );
}
