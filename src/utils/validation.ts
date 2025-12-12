import { z } from 'zod';

export type LoginForm = { email: string; password: string };
export type Errors = Partial<Record<keyof LoginForm, string>>;

export const loginSchema = z.object({
  email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' }),
  password: z.string().min(1, { message: 'Password is required' }).min(6, { message: 'The password must be at least 6 characters long.' }),
});

export function validate(values: LoginForm): Errors {
  const result = loginSchema.safeParse(values);
  if (result.success) return {};

  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof LoginForm | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
