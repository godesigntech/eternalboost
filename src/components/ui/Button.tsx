import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glow?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  glow = false,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-brand-primary text-black font-black hover:brightness-110 active:scale-[0.98] transition-all',
    secondary: 'bg-brand-accent text-white font-black hover:brightness-110 active:scale-[0.98] transition-all',
    outline: 'border border-white/20 text-white font-black hover:bg-white/5 active:scale-[0.98] transition-all',
    ghost: 'text-white/60 hover:text-white transition-colors',
  };

  const sizes = {
    sm: 'px-6 py-2 text-[10px] tracking-widest',
    md: 'px-10 py-5 text-sm tracking-widest',
    lg: 'px-12 py-6 text-base tracking-[0.15em]',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      className={cn(
        'relative inline-flex items-center justify-center uppercase',
        variant !== 'ghost' && 'skew-button',
        variants[variant],
        sizes[size],
        glow && variant === 'primary' && 'shadow-[0_0_30px_rgba(0,243,255,0.3)]',
        className
      )}
      {...props}
    >
      <span className={cn(variant !== 'ghost' && 'skew-x-[12deg]')}>
        {children}
      </span>
    </motion.button>
  );
}
