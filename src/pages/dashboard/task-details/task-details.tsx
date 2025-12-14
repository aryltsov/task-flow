import { useEffect, useState } from 'react';
import type { Task } from '../../../utils/types.ts';
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
  const { currentTask: task, loadingTask, fetchTaskById } = useTaskStore();
  const isAuthor = false;
  const [taskCopy, setTaskCopy] = useState<Task | null>(null);

  const comments: Comment[] = [
    { id: '1', author: { name: 'Alice' }, date: '2025-12-12', text: 'This task needs more details.' },
    { id: '2', author: { name: 'Bob' }, date: '2025-12-13', text: 'I will handle the backend part.' },
    { id: '3', author: { name: 'Charlie' }, date: '2025-12-13', text: 'Reviewed and looks good to me.' },
  ];

  useEffect(() => {
    fetchTaskById(taskId);
  }, [taskId, fetchTaskById]);

  useEffect(() => {
    if (task) {
      setTaskCopy(task);
    }
  }, [task]);
  console.log('taskId', taskId);
  console.log('task', task);
  console.log('taskCopy', taskCopy);
  const onChange = () => {
    console.log('onChange');
  };

  const onSave = () => {
    console.log('onSave');
  };

  if (loadingTask || !task || !taskCopy) {
    return <TaskDetailsSkeleton />;
  }

  if (!isAuthor) {
    return <ViewTask task={task} comments={comments} onClose={onClose} />;
  }

  return <EditTask task={task} comments={comments} onChange={onChange} onSave={onSave} />;
}

export default TaskDetails;
