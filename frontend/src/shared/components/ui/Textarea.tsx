import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...rest }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            block w-full rounded-lg border px-3 py-2 text-sm text-[#2D2D2D]
            placeholder:text-[#6B7280] bg-white resize-vertical
            transition-colors duration-150 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
            ${error ? 'border-[#EF4444] focus:ring-[#EF4444] focus:border-[#EF4444]' : 'border-[#E5E7EB]'}
            ${className}
          `.trim()}
          {...rest}
        />
        {error && (
          <p className="mt-1 text-sm text-[#EF4444]">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
