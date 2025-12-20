import { useEffect } from 'react';
import { useNavigate, useParams, useMatch } from 'react-router-dom';
import { useModal } from '@providers/modal.provider.tsx';
import { ROUTE_PATTERNS, ROUTES } from '@routes/paths.ts';

export default function ProjectModalController() {
  const { projectId } = useParams<{ projectId: string }>();
  const isView = useMatch(ROUTE_PATTERNS.dashboard.projects.view);
  const navigate = useNavigate();
  const { openModal } = useModal();

  useEffect(() => {
    if (!isView || !projectId) return;

    const onClose = () => {
      navigate(ROUTES.dashboard.projects.root, { replace: true });
    };

    openModal({
      body: <h1>Project details: {projectId}</h1>,
      onClose,
    });
  }, [isView, projectId]);

  return null;
}
