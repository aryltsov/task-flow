import React, { useState, type JSX } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
};

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
}: FormInputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const errorId = error ? `${id}-error` : undefined;

  const icon = (() => {
    if (name === 'email') return <Mail className='w-5 h-5 text-base-content/60' />;
    if (name === 'password') return <Lock className='w-5 h-5 text-base-content/60' />;
    return null;
  })();

  return (
    <div className={`form-control w-full ${className}`}>
      <label htmlFor={id} className='label'>
        <span className='label-text'>{label}</span>
      </label>

      <div className='relative'>
        {icon && <span className='absolute z-2 left-3 top-1/2 -translate-y-1/2 text-base-content/60'>{icon}</span>}

        <input
          id={id}
          name={name}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`input input-bordered w-full pl-10 pr-12
            transition-all duration-200
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
            tabIndex={-1}>
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
