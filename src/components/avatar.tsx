import type { JSX } from 'react';
import UserBadge from './user-badge.tsx';

type AvatarProps = {
  name: string;
  avatarUrl?: string;
  rtl?: boolean;
};

export default function Avatar({ name, avatarUrl, rtl = false }: AvatarProps): JSX.Element {
  return (
    <div className='flex items-center gap-2'>
      {rtl && <span className='text-sm'>{name}</span>}
      <div className='avatar'>
        <div className='w-8 h-8 rounded-full ring ring-base-300 overflow-hidden'>
          {avatarUrl ? <img src={avatarUrl} alt={name} /> : <UserBadge name={name} />}
        </div>
      </div>
      {!rtl && <span className='text-sm'>{name}</span>}
    </div>
  );
}
