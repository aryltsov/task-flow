import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from '@providers/modal.provider.tsx';
import { ROUTE_PATTERNS, ROUTES } from '@routes/paths.ts';
import ProjectDetails from '@pages/dashboard/projects/project-details.tsx';

export default function ProjectModalController() {
  const { projectId } = useParams<{ projectId: string }>();
  const isNew = location.pathname.includes(ROUTE_PATTERNS.projects.new);
  const isView = location.pathname.startsWith('/dashboard/projects') && !!projectId;
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (!isView && !isNew) return;

    const onClose = () => {
      closeModal();
      navigate(ROUTES.dashboard.projects.root, { replace: true });
    };

    openModal({
      body: <ProjectDetails projectId={projectId} isNew={isNew} onClose={onClose} />,
      onClose,
    });
  }, [isView, isNew, projectId]);

  return null;
}
