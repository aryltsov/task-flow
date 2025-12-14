import type { Assignee } from '../utils/types.ts';
import Avatar from './avatar.tsx';

type AssigneeInfoProps = {
  assignee?: Assignee | null;
};

export default function AssigneeInfo({ assignee }: AssigneeInfoProps) {
  if (!assignee) {
    return <span className='text-sm text-muted'>Unassigned</span>;
  }

  return <Avatar name={assignee.name} avatarUrl={assignee.avatarUrl} />;
}
