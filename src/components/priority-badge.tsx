import { usePriorityMap } from '@hooks/use-priority-map.ts';

type PriorityBadgeProps = {
  priority?: string;
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (!priority) return null;

  const PRIORITY_MAP = usePriorityMap();
  const config = PRIORITY_MAP[priority];
  if (!config) return null;

  return <span className={`capitalize badge badge-sm ${config.cls}`}>{config.label}</span>;
}
