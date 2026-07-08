import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, helperText, className = '', ...rest }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-[#6B7280]" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              block w-full rounded-lg border px-3 py-2 text-sm text-[#2D2D2D]
              placeholder:text-[#6B7280] bg-white
              transition-colors duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-[#EF4444] focus:ring-[#EF4444] focus:border-[#EF4444]' : 'border-[#E5E7EB]'}
              ${className}
            `.trim()}
            {...rest}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-[#EF4444]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[#6B7280]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
