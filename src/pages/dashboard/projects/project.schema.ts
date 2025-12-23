import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  status: z.enum(['active', 'archived']),
  description: z.string().trim().min(1, 'Description is required'),
  wiki: z.string().trim().min(1, 'Wiki is required'),
});

export type ProjectForm = z.infer<typeof projectSchema>;
