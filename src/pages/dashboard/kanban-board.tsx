import type { JSX } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import Column from './column';
import { useKanbanColumns } from '../../hooks/use-kanban-columns';
import { useKanbanDnd } from '../../hooks/use-kanban-dnd';

const COLUMN_ORDER = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'in-review', title: 'In Review' },
  { id: 'done', title: 'Done' },
] as const;

export default function KanbanBoard(): JSX.Element {
  const { columns, onDragEnd: handleDrag } = useKanbanColumns();
  const { DndWrapper } = useKanbanDnd();

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    handleDrag(String(active.id), String(over.id));
  };

  return (
    <div className='p-4'>
      <DndWrapper onDragEnd={onDragEnd}>
        <div className='flex gap-4 overflow-scroll h-[calc(100vh-94px)]'>
          {COLUMN_ORDER.map((col) => (
            <Column key={col.id} id={col.id} title={col.title} tasks={columns[col.id]} />
          ))}
        </div>
      </DndWrapper>
    </div>
  );
}
