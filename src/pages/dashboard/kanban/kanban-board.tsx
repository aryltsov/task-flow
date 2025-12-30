import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBoardStore } from '@stores/board.store';
import { useBoardSections } from '@hooks/use-board-sections';
import { useTaskReorder } from '@hooks/use-task-reorder';
import Column from './column';
import KanbanBoardSkeleton from './kanban-board-skeleton';

const KanbanBoard = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { filteredTasks, fetchActiveProject, fetchTasksByProject, setActiveProjectId, dropActiveProject, loadingTasks, updateTasksOrder } = useBoardStore();
  const boardSections = useBoardSections(filteredTasks);
  const reorderTasks = useTaskReorder();

  useEffect(() => {
    if (!projectId) return;
    setActiveProjectId(projectId);
    fetchActiveProject(projectId);
    fetchTasksByProject(projectId);
    return () => dropActiveProject();
  }, [projectId]);

  const onDragEnd = async (result: DropResult) => {
    const updatedTasks = reorderTasks(filteredTasks, result);
    await updateTasksOrder(updatedTasks);
  };

  if (loadingTasks) return <KanbanBoardSkeleton />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex gap-3 w-fit h-full'>
        {Object.entries(boardSections).map(([columnId, tasks]) => (
          <Column key={columnId} id={columnId} title={columnId} tasks={tasks.slice().sort((a, b) => (a.sortIndex ?? 0) - (b.sortIndex ?? 0))} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
