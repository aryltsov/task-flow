import type { ProjectForm } from './project.schema';
import { projectSchema } from './project.schema';
import { useZodForm } from '@hooks/use-zod-form';

export type ProjectErrors = Partial<Record<keyof ProjectForm, string>>;

function validateProject(values: ProjectForm): ProjectErrors {
  const result = projectSchema.safeParse(values);
  if (result.success) return {};

  return Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message])) as ProjectErrors;
}

export function useProjectForm(initial: ProjectForm, onSubmit: (form: ProjectForm) => Promise<void> | void) {
  const form = useZodForm<ProjectForm>(initial, validateProject);

  const handleSubmit = async () => {
    await form.submit(async (values) => {
      await onSubmit(values);
    });
  };

  return {
    form: form.values,
    errors: form.errors,
    loading: form.loading,
    isFormValid: form.isValid,
    handleChange: <K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) => form.update(key, value),
    handleBlur: (key: keyof ProjectForm) => form.blur(key),
    handleSubmit,
  };
}
