import { useState } from 'react';
import type { ProjectInterface } from '@models/project.interface.ts';

type ProjectEditProps = {
  project: ProjectInterface;
  onSave: (project: ProjectInterface) => void;
  onCancel: () => void;
};

export default function EditProject({ project, onSave, onCancel }: ProjectEditProps) {
  const [form, setForm] = useState<ProjectInterface>(project);

  const update = <K extends keyof ProjectInterface>(key: K, value: ProjectInterface[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className='w-[700px] max-h-[80vh] flex flex-col'>
      <h1 className='text-2xl font-bold mb-2'>Edit project</h1>

      <div className='flex mb-2'>
        <div className='form-control w-full pr-1'>
          <label className='label'>
            <span className='label-text font-medium'>Title</span>
          </label>
          <input type='text' className='input input-bordered w-full' value={form.title} onChange={(e) => update('title', e.target.value)} />
        </div>

        <div className='form-control w-full pl-1'>
          <label className='label'>
            <span className='label-text font-medium'>Status</span>
          </label>
          <select
            className='select select-bordered w-full'
            value={form.status}
            onChange={(e) => update('status', e.target.value as ProjectInterface['status'])}>
            <option value='active'>Active</option>
            <option value='archived'>Archived</option>
          </select>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto space-y-6 pr-1'>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text font-medium'>Description</span>
          </label>
          <p>
            <textarea
              className='textarea textarea-bordered min-h-[100px] w-full'
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
            />
          </p>
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text font-medium'>Wiki</span>
          </label>
          <p>
            <textarea
              className='textarea textarea-bordered font-mono min-h-[200px] w-full'
              value={form.wiki ?? ''}
              onChange={(e) => update('wiki', e.target.value)}
              placeholder='<h2>Project overview</h2>'
            />
          </p>
        </div>
      </div>

      <div className='pt-4 flex justify-end gap-2 border-t border-base-300'>
        <button className='btn btn-ghost' onClick={onCancel}>
          Cancel
        </button>
        <button className='btn btn-primary' onClick={() => onSave(form)}>
          Save changes
        </button>
      </div>
    </div>
  );
}
