import { useEffect } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import TaskDetails from '@pages/dashboard/kanban/task-details/task-details.tsx';
import { useModal } from '@providers/modal.provider.tsx';
import { ROUTE_PATTERNS, ROUTES } from '@routes/paths.ts';

export default function TaskModalController() {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const isView = useMatch(ROUTE_PATTERNS.dashboard.projects.tasks.view);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (!isView || !projectId || !taskId) return;

    const onClose = () => {
      closeModal();
      navigate(ROUTES.dashboard.projects.tasks.root(projectId), { replace: true });
    };

    openModal({
      body: <TaskDetails taskId={taskId} onClose={onClose} />,
      onClose,
    });
  }, [isView, projectId, taskId]);

  return null;
}
