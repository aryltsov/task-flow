import type { JSX } from 'react';
import type { Priority, Status, TaskCardProps } from '../../utils/types.ts';
import Avatar from '../../components/avatar.tsx';

const PRIORITY_MAP: Record<Priority, { label: string; cls: string }> = {
  low: { label: 'Low', cls: 'badge-success' },
  medium: { label: 'Medium', cls: 'badge-warning' },
  high: { label: 'High', cls: 'badge-error' },
  urgent: { label: 'Urgent', cls: 'badge-error badge-outline' },
};

const STATUS_MAP: Record<Status, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  'in-review': 'In Review',
  done: 'Done',
  blocked: 'Blocked',
};

export default function TaskCard({
  id,
  title,
  description,
  priority = 'medium',
  status = 'todo',
  assignee = null,
  dueDate,
  onStatusChange,
  onClick,
}: TaskCardProps): JSX.Element {
  const dueText = dueDate ? new Date(dueDate).toLocaleDateString() : null;

  const priorityBadge = PRIORITY_MAP[priority] && (
    <div className={`badge ${PRIORITY_MAP[priority].cls} badge-sm`} aria-hidden>
      {PRIORITY_MAP[priority].label}
    </div>
  );

  const assigneeInfo = assignee ? <Avatar name={assignee.name} avatarUrl={assignee.avatarUrl} /> : <div className='text-sm text-muted'>Unassigned</div>;

  return (
    <article
      className='w-[350px] card card-compact bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer'
      onClick={() => onClick?.(id)}
      role='button'
      aria-labelledby={`task-${id}-title`}>
      <div className='card-body p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-3 min-w-0'>
            <div className='flex flex-col'>
              <h3 id={`task-${id}-title`} className='text-base font-semibold truncate'>
                {title}
              </h3>
              {description && <p className='text-sm text-muted truncate max-w-[40ch]'>{description}</p>}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            {priorityBadge}
            {dueText && <span className='text-xs text-muted'>{dueText}</span>}
          </div>
        </div>

        <div className='flex items-center justify-between mt-3 gap-3'>
          <div className='flex items-center gap-3'>{assigneeInfo}</div>

          <div className='flex items-center gap-2'>
            <select
              className='select select-sm select-bordered'
              value={status}
              onChange={(e) => onStatusChange?.(id, e.target.value as Status)}
              aria-label='Change task status'
              onClick={(e) => e.stopPropagation()}>
              {Object.entries(STATUS_MAP).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <span className='text-xs px-2 py-1 rounded-md bg-base-200 text-muted'>{STATUS_MAP[status]}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
