import type { Status } from '../utils/types.ts';

const STATUS_MAP: Record<Status, { label: string; cls: string }> = {
  backlog: { label: 'Backlog', cls: 'badge-ghost' },
  todo: { label: 'To do', cls: 'badge-neutral' },
  progress: { label: 'In progress', cls: 'badge-primary' },
  done: { label: 'Done', cls: 'badge-success' },
  blocked: { label: 'Blocked', cls: 'badge-error' },
};

type StatusBadgeProps = {
  status?: Status;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return null;

  const config = STATUS_MAP[status];
  if (!config) return null;

  return <span className={`badge badge-sm ${config.cls}`}>{config.label}</span>;
}
