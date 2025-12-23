import { loginSchema } from './login.schema';
import type { LoginForm } from './login.schema';
import { useZodForm } from '@hooks/use-zod-form';

export type LoginErrors = Partial<Record<keyof LoginForm, string>> & {
  server?: string;
};

function validateLogin(values: LoginForm): Partial<Record<keyof LoginForm, string>> {
  const result = loginSchema.safeParse(values);
  if (result.success) return {};

  return Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message])) as Partial<Record<keyof LoginForm, string>>;
}

export function useLoginForm(onSubmit: (form: LoginForm) => Promise<void>) {
  const form = useZodForm<LoginForm>({ email: '', password: '' }, validateLogin);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await form.submit(onSubmit);
    } catch (err: any) {
      form.setErrors((prev: LoginErrors) => ({
        ...prev,
        server: err?.message ?? 'Login failed',
      }));
    }
  };

  return {
    form: form.values,
    errors: form.errors as LoginErrors,
    loading: form.loading,
    isFormValid: form.isValid,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => form.update(e.target.name as keyof LoginForm, e.target.value),
    handleBlur: (name: keyof LoginForm) => form.blur(name),
    handleSubmit,
  };
}
