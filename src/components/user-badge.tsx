import { getInitials } from '@utils/utils.ts';

type UserBadgeProps = {
  name: string;
};

export default function UserBadge({ name }: UserBadgeProps) {
  return <div className='flex items-center justify-center bg-accent text-sm font-medium text-base-content h-[32px]'>{getInitials(name)}</div>;
}
