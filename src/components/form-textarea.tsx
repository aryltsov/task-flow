type FormTextareaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
};

export default function FormTextarea({ id, label, value, onChange, onBlur, error, required, className = '', placeholder }: FormTextareaProps) {
  return (
    <div className={`form-control w-full ${className}`}>
      <label htmlFor={id} className='label'>
        <span className='label-text font-medium'>{label}</span>
      </label>

      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`textarea textarea-bordered w-full min-h-[120px]
          ${error ? 'textarea-error' : ''}
        `}
      />

      {error && <p className='text-error text-sm mt-1'>{error}</p>}
    </div>
  );
}
