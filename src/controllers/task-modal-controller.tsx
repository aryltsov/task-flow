import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '@components/modal.tsx';
import TaskDetails from '@pages/dashboard/kanban/task-details/task-details.tsx';

export default function TaskModalController() {
  const { projectId, taskId } = useParams<{ projectId: string; taskId?: string }>();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (!taskId) {
      closeModal();
      return;
    }

    openModal({
      body: <TaskDetails taskId={taskId} onClose={onCloseHandler} />,
      onClose: onCloseHandler,
    });

    function onCloseHandler() {
      navigate(`/dashboard/projects/${projectId}`);
      closeModal();
    }
  }, [taskId]);

  return null;
}
