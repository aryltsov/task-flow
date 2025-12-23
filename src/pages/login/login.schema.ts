import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Email is invalid'),
  password: z.string().min(1, 'Password is required').min(6, 'The password must be at least 6 characters long'),
});

export type LoginForm = z.infer<typeof loginSchema>;
