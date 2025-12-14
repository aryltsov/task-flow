import { useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '../components/modal.tsx';
import TaskDetails from '../pages/dashboard/task-details/task-details.tsx';

export function TaskModalController() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, closeModal } = useModal();

  const taskId = params.get('task');

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
      const newParams = new URLSearchParams(location.search);
      newParams.delete('task');
      navigate({ pathname: location.pathname, search: newParams.toString() });
    }
  }, [taskId]);

  return null;
}
