import type { Assignee, Priority, Status, Task } from '../../../utils/types.ts';
import TaskComments from './task-comments.tsx';

type Comment = {
  id: string;
  author: { name: string };
  date: string;
  text: string;
};

type TaskEditProps = {
  task: Task;
  comments: Comment[];
  onClose: () => void;
};

import { useState, useEffect } from 'react';

export default function EditTask({ task, comments, onClose }: TaskEditProps) {
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

  const onSave = () => {
    // Здесь можно добавить логику сохранения (например, вызов API)
    // Сейчас просто закрываем окно
    onClose();
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
            <select value={taskCopy.priority} onChange={(e) => onChange('priority', e.target.value as Priority)} className='select select-bordered w-full'>
              <option value='low'>Низкий</option>
              <option value='medium'>Средний</option>
              <option value='high'>Высокий</option>
            </select>
          </div>

          <div className='flex-1'>
            <label className='label font-medium'>Статус</label>
            <select value={taskCopy.status} onChange={(e) => onChange('status', e.target.value as Status)} className='select select-bordered w-full'>
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

          <div className='flex-1'>
            <label className='label font-medium'>Дата выполнения</label>
            <input type='date' value={taskCopy.dueDate || ''} onChange={(e) => onChange('dueDate', e.target.value)} className='input input-bordered w-full' />
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
