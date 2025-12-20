import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DueDate from '@components/date.tsx';
import PriorityBadge from '@components/priority-badge.tsx';
import AssigneeInfo from '@components/assignee-info.tsx';
import type { Task } from '@models/task.interface';
import { ROUTES } from '@routes/paths.ts';

export default function TaskCard(task: Task) {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(ROUTES.dashboard.projects.tasks.view(projectId as string, task.id), {
      state: { backgroundLocation: location },
    });
  };

  return (
    <article
      className='w-full card card-compact bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer overflow-hidden'
      role='button'
      aria-labelledby={`task-${task.id}-title`}>
      <div
        className='card-body p-4'
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex flex-col min-w-0'>
            <h3 data-no-drag id={`task-${task.id}-title`} className='text-base font-semibold w-[235px] line-clamp-3 break-words cursor-pointer'>
              {task.title}
            </h3>
            {task.description && <p className='text-sm text-base-content/70 w-[235px] line-clamp-2 break-words'>{task.description}</p>}
          </div>

          <div className='flex flex-col items-end gap-2'>
            <DueDate date={task.dueDate} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <AssigneeInfo assignee={task.assignee} />
        </div>
      </div>
    </article>
  );
}
