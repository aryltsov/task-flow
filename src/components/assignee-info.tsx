import type { Assignee } from '@models/creator.ts';
import Avatar from '@components/avatar.tsx';

interface AssigneeInfoProps {
  assignee: Assignee | string | null;
}

export default function AssigneeInfo({ assignee }: AssigneeInfoProps) {
  if (!assignee) {
    return <span className='text-sm text-muted'>Unassigned</span>;
  }

  if (typeof assignee === 'string') {
    return <span className='text-sm'>{assignee}</span>;
  }

  return <Avatar name={assignee.name} avatarUrl={assignee.avatarUrl} />;
}
