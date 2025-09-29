import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  icon: Icon,
  options,
  placeholder,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors bg-white';
  const stateClasses = error 
    ? 'border-red-300 focus:ring-red-500' 
    : 'border-gray-300 focus:ring-blue-500';
  const iconClasses = Icon ? 'pl-10' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${stateClasses} ${iconClasses} ${widthClass} ${className}`.trim();

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        
        <select
          id={selectId}
          className={classes}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;

