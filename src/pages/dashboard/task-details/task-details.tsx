import { useEffect } from 'react';
import { useTaskStore } from '../../../stores/task-store.ts';
import ViewTask from './view-task.tsx';
import EditTask from './edit-task.tsx';
import TaskDetailsSkeleton from './task-details-skeleton.tsx';

type Comment = {
  id: string;
  author: { name: string };
  date: string;
  text: string;
};

type TaskDetailsProps = {
  taskId: string;
  onClose: () => void;
};

function TaskDetails({ taskId, onClose }: TaskDetailsProps) {
  // todo fix multiple rerender
  const task = useTaskStore((state) => state.currentTask);
  const loadingTask = useTaskStore((state) => state.loadingTask);
  const fetchTaskById = useTaskStore((state) => state.fetchTaskById);
  const isAuthor = false;

  console.log('task', task);
  const comments: Comment[] = [
    { id: '1', author: { name: 'Alice' }, date: '2025-12-12', text: 'This task needs more details.' },
    { id: '2', author: { name: 'Bob' }, date: '2025-12-13', text: 'I will handle the backend part.' },
    { id: '3', author: { name: 'Charlie' }, date: '2025-12-13', text: 'Reviewed and looks good to me.' },
  ];

  useEffect(() => {
    // Не грузим задачу, если уже есть и id совпадает
    if (!task || task.id !== taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId, fetchTaskById, task]);

  if (loadingTask || !task) {
    return <TaskDetailsSkeleton />;
  }

  if (!isAuthor) {
    return <ViewTask task={task} comments={comments} onClose={onClose} />;
  }

  // onChange/onSave реализуются внутри EditTask через локальный стейт
  return <EditTask task={task} comments={comments} onClose={onClose} />;
}

export default TaskDetails;
