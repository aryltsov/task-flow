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
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from './column.tsx';
import TaskCard from './task-card.tsx';
import { useState, useEffect } from 'react';
import { findBoardSectionContainer, initializeBoard } from '../../../utils/board.ts';
import type { BoardSections, Task } from '../../../utils/types.ts';
import { produce } from 'immer';
import { useTaskStore } from '../../../stores/task-store.ts';
import KanbanBoardSkeleton from './kanban-board-skeleton.tsx';

const KanbanBoard = () => {
  const { tasks, loadingTasks, getTasks } = useTaskStore();
  const [boardSections, setBoardSections] = useState<BoardSections>({});
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  // Получаем таски при монтировании
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  // Инициализация boardSections после получения тасок
  useEffect(() => {
    if (tasks.length) {
      setBoardSections(initializeBoard(tasks));
    }
  }, [tasks]);

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

  const activeTask = activeTaskId ? tasks.find((t) => t.id === activeTaskId) : null;

  return (
    <>
      {loadingTasks && <KanbanBoardSkeleton />}
      <div className='relative'>
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          <div className='flex items-top justify-center gap-3 w-fit h-full overflow-scroll'>
            {Object.keys(boardSections).map((boardSectionKey) => (
              <Column key={boardSectionKey} id={boardSectionKey} title={boardSectionKey} tasks={boardSections[boardSectionKey]} />
            ))}
            <DragOverlay dropAnimation={defaultDropAnimation}>{activeTask ? <TaskCard {...activeTask} /> : null}</DragOverlay>
          </div>
        </DndContext>
      </div>
    </>
  );
};

export default KanbanBoard;
