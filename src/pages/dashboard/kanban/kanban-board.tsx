import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { produce } from 'immer';
import Column from './column';
import KanbanBoardSkeleton from './kanban-board-skeleton';
import { useBoardStore } from '@stores/board.store';
import { useBoardSections } from '@hooks/use-board-sections';

import type { BoardSections } from '@models/board-sections';

const KanbanBoard = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { setActiveProjectId, fetchActiveProject, fetchTasksByProject, dropActiveProject, tasks, loadingTasks } = useBoardStore();

  useEffect(() => {
    if (!projectId) return;

    setActiveProjectId(projectId);
    fetchActiveProject(projectId);
    fetchTasksByProject(projectId);

    return () => dropActiveProject();
  }, [projectId]);

  const baseBoardSections = useBoardSections(tasks);
  const [boardSections, setBoardSections] = useState<BoardSections>({});

  useEffect(() => {
    setBoardSections(baseBoardSections);
  }, [baseBoardSections]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    setBoardSections((board) =>
      produce(board, (draft) => {
        const sourceList = draft[source.droppableId];
        const destList = draft[destination.droppableId];

        const [moved] = sourceList.splice(source.index, 1);
        destList.splice(destination.index, 0, moved);
      })
    );
  };

  if (loadingTasks) {
    return <KanbanBoardSkeleton />;
  }

  // todo fix 'Droppable: unsupported nested scroll...'
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex gap-3 w-fit h-full'>
        {Object.entries(boardSections).map(([columnId, tasks]) => (
          <Column key={columnId} id={columnId} title={columnId} tasks={tasks} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
