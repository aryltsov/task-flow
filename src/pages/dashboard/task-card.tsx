import type { JSX } from 'react';
import type { Priority, TaskCardProps } from '../../utils/types.ts';
import Avatar from '../../components/avatar.tsx';

const PRIORITY_MAP: Record<Priority, { label: string; cls: string }> = {
  low: { label: 'Low', cls: 'badge-secondary' },
  medium: { label: 'Medium', cls: 'badge-info' },
  high: { label: 'High', cls: 'badge-warning' },
  urgent: { label: 'Urgent', cls: 'badge-error' },
};

export default function TaskCard({ id, title, description, priority = 'medium', assignee = null, dueDate, onClick }: TaskCardProps): JSX.Element {
  const dueText = dueDate ? new Date(dueDate).toLocaleDateString() : null;

  const priorityBadge = PRIORITY_MAP[priority] && (
    <div className={`badge ${PRIORITY_MAP[priority].cls} badge-sm`} aria-hidden>
      {PRIORITY_MAP[priority].label}
    </div>
  );

  const assigneeInfo = assignee ? <Avatar name={assignee.name} avatarUrl={assignee.avatarUrl} /> : <div className='text-sm text-muted'>Unassigned</div>;

  return (
    <article
      className='w-full card card-compact bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer overflow-hidden'
      onClick={() => onClick?.(id)}
      role='button'
      aria-labelledby={`task-${id}-title`}>
      <div className='card-body p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3 min-w-0'>
            <div className='flex flex-col'>
              <h3 id={`task-${id}-title`} className='text-base font-semibold w-[235px] line-clamp-3 break-words'>
                {title}
              </h3>
              {description && <p className='text-sm text-base-content/70 w-[235px] line-clamp-2 break-words'>{description}</p>}
            </div>
          </div>

          <div className='flex flex-col items-end gap-2'>
            {dueText && <p className='text-xs text-muted'>{dueText}</p>}
            {priorityBadge}
          </div>
        </div>

        <div className='flex items-center justify-between mt-4 gap-3'>
          <div className='flex items-center gap-3'>{assigneeInfo}</div>
        </div>
      </div>
    </article>
  );
}
