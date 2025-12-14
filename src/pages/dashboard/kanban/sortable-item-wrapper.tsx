import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableTaskItemProps = {
  children: React.ReactNode;
  id: string;
};

const SortableItemWrapper = ({ children, id }: SortableTaskItemProps) => {
  const sortable = useSortable({ id });

  // prevent drag on specific element and let it be clickable
  const handlePointerDown = (event: React.PointerEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('[data-no-drag]')) {
      return;
    }
    if (sortable.listeners && sortable.listeners.onPointerDown) {
      sortable.listeners.onPointerDown(event as any);
    }
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition || undefined,
    opacity: sortable.isDragging ? 0 : 1,
  };

  return (
    <div ref={sortable.setNodeRef} style={style} {...sortable.attributes} {...sortable.listeners} onPointerDown={handlePointerDown}>
      {children}
    </div>
  );
};

export default SortableItemWrapper;
