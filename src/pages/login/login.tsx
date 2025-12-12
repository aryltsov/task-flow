import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/form-input.tsx';
import { validate } from '../../utils/validation.ts';
import { useAuth } from '../../hooks/use-auth.hook.ts';

type FormState = { email: string; password: string };
type Errors = Partial<Record<keyof FormState, string>>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setLoading(true);

    try {
      await login(form);
      navigate('/dashboard', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200'>
      <div className='card w-full max-w-md shadow-xl bg-base-100'>
        <div className='card-body'>
          <h2 className='card-title self-center'>Login</h2>

          <form onSubmit={handleSubmit} noValidate className='space-y-4'>
            <FormInput id='email' name='email' type='email' label='Email' value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} />

            <FormInput
              id='password'
              name='password'
              type='password'
              label='Password'
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
            />

            <div className='form-control mt-6'>
              <button type='submit' className={`btn btn-primary w-full ${loading ? 'loading' : ''}`} disabled={loading || Object.keys(errors).length > 0}>
                {loading ? 'Login in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
