import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import type { FormInputProps } from '@models/form-input-props.interface.ts';

export default function FormInput({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = '',
  required = false,
  autoComplete,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const errorId = error ? `${id}-error` : undefined;

  const getIcon = (name: string) => {
    if (name === 'email') return <Mail className='w-5 h-5 text-base-content/60' />;
    if (name === 'password') return <Lock className='w-5 h-5 text-base-content/60' />;
    return null;
  };

  const icon = getIcon(name);

  return (
    <div className={`form-control w-full ${className}`}>
      <label htmlFor={id} className='label'>
        <span className='label-text'>{label}</span>
      </label>

      <div className='relative'>
        {icon && <span className='absolute z-2 left-3 top-1/2 -translate-y-1/2'>{icon}</span>}

        <input
          id={id}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`input input-bordered w-full pl-10 pr-12
            transition-colors transition-shadow duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
            ${error ? 'input-error' : ''}
            ${disabled ? 'input-disabled opacity-60 cursor-not-allowed' : ''}
          `}
        />

        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword((s) => !s)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content'
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className='text-error text-sm mt-1'>
          {error}
        </p>
      )}
    </div>
  );
}
