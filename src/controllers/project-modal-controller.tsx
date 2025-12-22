import { useEffect } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { useModal } from '@providers/modal.provider.tsx';
import { ROUTE_PATTERNS, ROUTES } from '@routes/paths.ts';
import ProjectDetails from '@pages/dashboard/projects/project-details.tsx';

export default function ProjectModalController() {
  const { projectId } = useParams<{ projectId: string }>();
  const isView = useMatch(ROUTE_PATTERNS.dashboard.projects.view);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (!isView || !projectId) return;

    const onClose = () => {
      closeModal();
      navigate(ROUTES.dashboard.projects.root, { replace: true });
    };

    openModal({
      body: <ProjectDetails projectId={projectId} onClose={onClose} />,
      onClose,
    });
  }, [isView, projectId]);

  return null;
}
