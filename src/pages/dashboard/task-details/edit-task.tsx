import type { Assignee, Priority, Status, Task } from '../../../utils/types.ts';
import TaskComments from './task-comments.tsx';

type TaskEditProps = {
  task: Task;
  comments: any[];
  onChange: <K extends keyof Task>(key: K, value: Task[K]) => void;
  onSave: () => void;
};

export default function EditTask({ task, comments, onChange, onSave }: TaskEditProps) {
  return (
    <div className='w-full max-w-lg mx-auto'>
      <h2 className='text-2xl font-semibold mb-4'>{task.title}</h2>

      <div className='grid grid-cols-1 gap-4'>
        <div>
          <label className='label font-medium'>Описание</label>
          <textarea value={task.description || ''} onChange={(e) => onChange('description', e.target.value)} className='textarea textarea-bordered w-full' />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='label font-medium'>Приоритет</label>
            <select value={task.priority} onChange={(e) => onChange('priority', e.target.value as Priority)} className='select select-bordered w-full'>
              <option value='low'>Низкий</option>
              <option value='medium'>Средний</option>
              <option value='high'>Высокий</option>
            </select>
          </div>

          <div className='flex-1'>
            <label className='label font-medium'>Статус</label>
            <select value={task.status} onChange={(e) => onChange('status', e.target.value as Status)} className='select select-bordered w-full'>
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
              value={task.assignee?.name || ''}
              onChange={(e) => onChange('assignee', { ...task.assignee, name: e.target.value } as Assignee)}
              className='input input-bordered w-full'
            />
          </div>

          <div className='flex-1'>
            <label className='label font-medium'>Дата выполнения</label>
            <input type='date' value={task.dueDate || ''} onChange={(e) => onChange('dueDate', e.target.value)} className='input input-bordered w-full' />
          </div>
        </div>

        <div className='flex justify-end mt-4'>
          <button className='btn btn-primary' onClick={onSave}>
            Сохранить
          </button>
        </div>

        <TaskComments comments={comments} />
      </div>
    </div>
  );
}
