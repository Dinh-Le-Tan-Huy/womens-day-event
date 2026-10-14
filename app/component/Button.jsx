import React from "react";
import { buttonStyles } from "../Style/tokens";

/**
 * Reusable Button Component cho dự án 20-10
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'gold' | 'glass'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-3.5 text-lg font-bold",
  };

  const selectedVariant = buttonStyles[variant] || buttonStyles.primary;
  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 select-none ${selectedVariant} ${selectedSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
