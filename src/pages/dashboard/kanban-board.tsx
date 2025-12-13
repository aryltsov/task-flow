import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
  defaultDropAnimation,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  type DropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from './column.tsx';
import { INITIAL_TASKS } from '../../data/tasks.ts';
import { findBoardSectionContainer, initializeBoard } from '../../utils/board.ts';
import { useState } from 'react';
import { getTaskById } from '../../utils/tasks.ts';
import TaskCard from './task-card.tsx';
import { produce } from 'immer';
import type { BoardSections, Task } from '../../utils/types.ts';

const KanbanBoard = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(INITIAL_TASKS);
  const [boardSections, setBoardSections] = useState<BoardSections>(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const moveTask = (board: BoardSections, activeId: string, overId: string) => {
    return produce(board, (draft: BoardSections) => {
      const activeContainer = findBoardSectionContainer(draft, activeId);
      const overContainer = findBoardSectionContainer(draft, overId);

      if (!activeContainer || !overContainer) return;

      const activeIndex = draft[activeContainer].findIndex((t: Task) => t.id === activeId);
      const overIndex = draft[overContainer].findIndex((t: Task) => t.id === overId);

      if (activeIndex === -1 || overIndex === -1) return;

      const [movedItem] = draft[activeContainer].splice(activeIndex, 1);
      draft[overContainer].splice(overIndex, 0, movedItem);
    });
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    setBoardSections((board) => moveTask(board, active.id as string, over.id as string));
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    setBoardSections((board) => moveTask(board, active.id as string, over.id as string));
    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className='flex items-top justify-center gap-3 w-fit h-full overflow-scroll'>
        {Object.keys(boardSections).map((boardSectionKey) => (
          <Column key={boardSectionKey} id={boardSectionKey} title={boardSectionKey} tasks={boardSections[boardSectionKey]} />
        ))}
        <DragOverlay dropAnimation={dropAnimation}>{task ? <TaskCard {...task} /> : null}</DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
