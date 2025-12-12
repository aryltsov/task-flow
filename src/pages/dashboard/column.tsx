import type { JSX } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task, Status } from '../../utils/types.ts';
import SortableTask from './sortable-task.tsx';

type Props = {
  id: Status;
  title: string;
  tasks: Task[];
};

export default function Column({ id, title, tasks }: Props): JSX.Element {
  const { setNodeRef } = useDroppable({ id: `column-${id}` });

  return (
    <div ref={setNodeRef} className='flex flex-col bg-base-200 rounded-md p-3 gap-3 min-w-[374px]' aria-label={title}>
      <div className='flex items-center justify-between mb-1'>
        <h4 className='font-semibold'>{title}</h4>
        <span className='text-sm text-muted'>{tasks.length}</span>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className='flex flex-col gap-2'>
          {tasks.map((t, i) => (
            <SortableTask key={t.id} task={t} index={i} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
