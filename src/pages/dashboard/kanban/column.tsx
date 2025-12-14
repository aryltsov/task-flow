import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task } from '../../../utils/types.ts';
import TaskCard from './task-card.tsx';
import SortableItemWrapper from './sortable-item-wrapper.tsx';

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const Column = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className='flex flex-col bg-base-200 rounded-md p-3 gap-3 w-[390px]' aria-label={title}>
      <div className='flex items-center justify-between mb-1'>
        <h4 className='font-semibold'>{title}</h4>
        <span className='text-sm text-muted'>{tasks.length}</span>
      </div>

      <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
        <div className='w-full' ref={setNodeRef}>
          {tasks.map((task) => (
            <div key={task.id} className='mb-2'>
              <SortableItemWrapper id={task.id}>
                <TaskCard {...task} />
              </SortableItemWrapper>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
