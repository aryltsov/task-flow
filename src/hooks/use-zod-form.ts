import { useState } from 'react';

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function useZodForm<T extends Record<string, any>>(initial: T, validate: (values: T) => FieldErrors<T>) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));

    const fieldError = validate({ ...values, [key]: value })[key];
    setErrors((prev) => ({ ...prev, [key]: fieldError }));
  };

  const blur = <K extends keyof T>(key: K) => {
    setTouched((t) => ({ ...t, [key]: true }));

    const fieldError = validate(values)[key];
    setErrors((e) => ({ ...e, [key]: fieldError }));
  };

  const submit = async (onSubmit: (values: T) => Promise<void>) => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Partial<Record<keyof T, boolean>>));

    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  const isValid = Object.keys(validate(values)).length === 0;

  return {
    values,
    errors,
    touched,
    loading,
    isValid,
    update,
    blur,
    submit,
    setErrors,
  };
}
