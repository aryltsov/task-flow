import { DndContext, PointerSensor, useSensor, useSensors, KeyboardSensor, pointerWithin, type DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { JSX, ReactNode } from 'react';

export interface UseKanbanDndResult {
  sensors: ReturnType<typeof useSensors>;
  DndWrapper: (props: { onDragEnd: (event: DragEndEvent) => void; children: ReactNode }) => JSX.Element;
}

export function useKanbanDnd(): UseKanbanDndResult {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const DndWrapper = ({ onDragEnd, children }: { onDragEnd: (event: DragEndEvent) => void; children: ReactNode }) => (
    <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragEnd={onDragEnd}>
      {children}
    </DndContext>
  );

  return { sensors, DndWrapper };
}
