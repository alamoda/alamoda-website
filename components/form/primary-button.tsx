import { cn } from "@/lib/util";
import React from "react";

interface PrimaryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function PrimaryButton({ type, className, disabled, children, ...props }: PrimaryButtonProps) {
  return (
    <>
      <button
        type={type ? type : 'button'}
        {...props}
        disabled={disabled}
        className={cn(
          'flex items-center justify-center text-center border border-transparent my-3 px-4 py-2 bg-gray-900 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50',
          className ? className : ''
        )}
      >
        {children}
      </button >
    </>
  )
}