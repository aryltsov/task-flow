import type { Task } from '@models/task.interface';
import type { Assignee } from '@models/creator';
import { useState, useEffect } from 'react';

type TaskEditProps = {
  task: Task;
  onSave: (res: any) => void;
  onCancel: () => void;
};

export default function EditTask({ task, onSave, onCancel }: TaskEditProps) {
  const [taskCopy, setTaskCopy] = useState<Task>({ ...task });

  useEffect(() => {
    setTaskCopy({ ...task });
  }, [task]);

  const onChange = <K extends keyof Task>(key: K, value: Task[K]) => {
    setTaskCopy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className='w-full max-w-lg mx-auto'>
      <h2 className='text-2xl font-semibold mb-4'>{taskCopy.title}</h2>

      <div className='grid grid-cols-1 gap-4'>
        <div>
          <label className='label font-medium'>Описание</label>
          <textarea
            value={taskCopy.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className='textarea textarea-bordered w-full'
          />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='label font-medium'>Приоритет</label>
            <select value={taskCopy.priority} onChange={(e) => onChange('priority', e.target.value)} className='select select-bordered w-full'>
              <option value='low'>Низкий</option>
              <option value='medium'>Средний</option>
              <option value='high'>Высокий</option>
            </select>
          </div>

          <div className='flex-1'>
            <label className='label font-medium'>Статус</label>
            <select value={taskCopy.status} onChange={(e) => onChange('status', e.target.value)} className='select select-bordered w-full'>
              <option value='backlog'>Backlog</option>
              <option value='todo'>Todo</option>
              <option value='progress'>Progress</option>
              <option value='done'>Done</option>
              <option value='blocked'>Blocked</option>
            </select>
          </div>
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='label font-medium'>Исполнитель</label>
            <input
              type='text'
              value={taskCopy.assignee?.name || ''}
              onChange={(e) => onChange('assignee', { ...taskCopy.assignee, name: e.target.value } as Assignee)}
              className='input input-bordered w-full'
            />
          </div>

          {/*<div className='flex-1'>*/}
          {/*  <label className='label font-medium'>Дата выполнения</label>*/}
          {/*  <input type='date' value={taskCopy.dueDate || ''} onChange={(e) => onChange('dueDate', e.target.value)} className='input input-bordered w-full' />*/}
          {/*</div>*/}
        </div>

        <div className='pt-4 flex justify-end gap-2 border-t border-base-300'>
          <button className='btn btn-ghost' onClick={onCancel}>
            Cancel
          </button>
          <button className='btn btn-primary' onClick={() => onSave(true)}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
