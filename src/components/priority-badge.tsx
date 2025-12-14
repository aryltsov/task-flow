import type { Priority } from '../utils/types.ts';

const PRIORITY_MAP: Record<Priority, { label: string; cls: string }> = {
  low: { label: 'Low', cls: 'badge-secondary' },
  medium: { label: 'Medium', cls: 'badge-info' },
  high: { label: 'High', cls: 'badge-warning' },
  urgent: { label: 'Urgent', cls: 'badge-error' },
};

type PriorityBadgeProps = {
  priority?: Priority;
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (!priority) return null;

  const config = PRIORITY_MAP[priority];
  if (!config) return null;

  return <span className={`badge badge-sm ${config.cls}`}>{config.label}</span>;
}
