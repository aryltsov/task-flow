import type { JSX } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import type { Task } from '../../utils/types.ts';
import TaskCard from './task-card.tsx';

type Props = {
  task: Task;
  index: number;
};

export default function SortableTask({ task }: Props): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  } as const;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='mb-2'>
      <TaskCard
        id={task.id}
        title={task.title}
        description={task.description}
        priority={task.priority}
        status={task.status}
        assignee={task.assignee}
        dueDate={task.dueDate}
        onClick={() => {}}
      />
    </div>
  );
}
