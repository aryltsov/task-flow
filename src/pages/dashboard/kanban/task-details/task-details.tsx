import { useEffect, useState } from 'react';
import ViewTask from './view-task.tsx';
import EditTask from './edit-task.tsx';
import TaskDetailsSkeleton from './task-details-skeleton.tsx';
import { useBoardStore } from '@stores/board.store.ts';
import type { AuthContextType } from '@models/auth-context-type.interface.ts';
import { useAuth } from '@hooks/use-auth.ts';
import type { ProjectInterface } from '@models/project.interface.ts';
import ModalButtons from '@components/modal-buttons.tsx';

type TaskDetailsProps = {
  taskId: string;
  onClose: () => void;
};

export default function TaskDetails({ taskId, onClose }: TaskDetailsProps) {
  const { currentTask: task, loadingTask, fetchTaskById } = useBoardStore();
  const auth: AuthContextType = useAuth();
  const [edit, setEdit] = useState(false);
  const isCreator = task?.creator.email === auth.user?.email;

  useEffect(() => {
    if (!task || task.id !== taskId) {
      fetchTaskById(taskId);
    }
  }, [taskId, fetchTaskById, task]);

  if (loadingTask || !task) {
    return <TaskDetailsSkeleton />;
  }

  const saveTask = (res: ProjectInterface) => {
    console.log('saveTask');
    console.log('res', res);
  };

  if (edit) return <EditTask task={task} onCancel={() => setEdit(false)} onSave={(res: any) => saveTask(res)} />;

  if (task) {
    return (
      <>
        <ViewTask {...task} />
        <ModalButtons extended={isCreator} onClose={onClose} onEdit={() => setEdit(true)} />
      </>
    );
  }
}
