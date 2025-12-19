import { useState, useMemo } from 'react';
import { validate } from '@utils/validation.ts';
import type { Credentials } from '@models/credentials';

export type Errors = Partial<Record<keyof Credentials, string>> & { server?: string };

export function useLoginForm(onSubmit: (form: Credentials) => Promise<void>) {
  const [form, setForm] = useState<Credentials>({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => Object.keys(validate(form)).length === 0, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    const validation = validate(nextForm);
    setErrors((prev) => ({
      ...prev,
      [name]: validation[name as keyof Credentials],
      server: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, server: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, loading, isFormValid, handleChange, handleSubmit };
}
