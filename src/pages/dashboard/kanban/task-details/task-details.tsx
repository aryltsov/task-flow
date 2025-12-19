import { useEffect } from 'react';
import ViewTask from './view-task.tsx';
import EditTask from './edit-task.tsx';
import TaskDetailsSkeleton from './task-details-skeleton.tsx';
import { useBoardStore } from '@stores/board.store.ts';

type TaskDetailsProps = {
  taskId: string;
  onClose: () => void;
};

function TaskDetails({ taskId, onClose }: TaskDetailsProps) {
  const { currentTask: task, loadingTask, fetchTaskById } = useBoardStore();
  const isAuthor = false;

  useEffect(() => {
    if (!task || task.id !== taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId, fetchTaskById, task]);

  if (loadingTask || !task) {
    return <TaskDetailsSkeleton />;
  }

  if (!isAuthor) {
    return <ViewTask task={task} onClose={onClose} />;
  }

  return <EditTask task={task} onClose={onClose} />;
}

export default TaskDetails;
