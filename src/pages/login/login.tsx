import { useNavigate } from 'react-router-dom';
import FormInput from '@components/form-input.tsx';
import NavBar from '@components/nav-bar.tsx';
import { useLoginForm } from './use-login-form.hook.ts';
import { useAuth } from '@hooks/use-auth.ts';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { form, errors, loading, isFormValid, handleChange, handleSubmit } = useLoginForm(async (form) => {
    await login(form);
    navigate('/dashboard', { replace: true });
  });

  return (
    <>
      <NavBar />
      <div className='min-h-screen flex items-center justify-center bg-base-200'>
        <div className='card w-full max-w-md shadow-xl bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title self-center'>Login</h2>

            <form onSubmit={handleSubmit} noValidate className='space-y-4'>
              <FormInput
                id='email'
                name='email'
                type='email'
                label='Email'
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete='username'
              />

              <FormInput
                id='password'
                name='password'
                type='password'
                label='Password'
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                required
                autoComplete='current-password'
              />

              {errors.server && <p className='text-red-500'>{errors.server}</p>}

              <div className='form-control mt-6'>
                <button type='submit' className={`btn btn-primary w-full ${loading ? 'loading' : ''}`} disabled={!isFormValid || loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
