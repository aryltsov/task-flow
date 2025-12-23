import type { ProjectInterface } from '@models/project.interface';
import FormInput from '@components/form-input';
import FormTextarea from '@components/form-textarea';
import { useProjectForm } from '@pages/dashboard/projects/use-project-form.ts';

type ProjectEditProps = {
  project: ProjectInterface;
  onSave: (project: ProjectInterface) => void;
  onCancel: () => void;
};

export default function EditProject({ project, onSave, onCancel }: ProjectEditProps) {
  const { form, errors, loading, isFormValid, handleChange, handleBlur, handleSubmit } = useProjectForm(
    {
      title: project.title || '',
      status: project.status || 'active',
      description: project.description || '',
      wiki: project.wiki ?? '',
    },
    async (values) => {
      onSave({
        ...project,
        ...values,
      });
    }
  );

  return (
    <div className='w-[700px] max-h-[80vh] flex flex-col'>
      <h1 className='text-2xl font-bold mb-2'>Edit project</h1>

      <div className='flex mb-2'>
        <FormInput
          id='title'
          name='title'
          label='Title'
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          onBlur={() => handleBlur('title')}
          error={errors.title}
          required
          className='pr-1'
        />

        <div className='form-control w-full pl-1'>
          <label className='label'>
            <span className='label-text font-medium'>Status</span>
          </label>

          <select
            className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value as ProjectInterface['status'])}
            onBlur={() => handleBlur('status')}>
            <option value='active'>Active</option>
            <option value='archived'>Archived</option>
          </select>

          {errors.status && <p className='text-error text-sm mt-1'>{errors.status}</p>}
        </div>
      </div>

      <div className='flex-1 overflow-y-auto space-y-6 pr-1'>
        <FormTextarea
          id='description'
          label='Description'
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          error={errors.description}
          required
        />

        <FormTextarea
          id='wiki'
          label='Wiki'
          value={form.wiki}
          onChange={(e) => handleChange('wiki', e.target.value)}
          onBlur={() => handleBlur('wiki')}
          error={errors.wiki}
          placeholder='<h2>Project overview</h2>'
          required
        />
      </div>

      <div className='pt-4 flex justify-end gap-2 border-t border-base-300'>
        <button className='btn btn-ghost' onClick={onCancel} disabled={loading}>
          Cancel
        </button>

        <button className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={!isFormValid || loading} onClick={handleSubmit}>
          {loading ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
