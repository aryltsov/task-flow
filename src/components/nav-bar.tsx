import { Link } from 'react-router-dom';
import ThemeSwitcher from '@components/theme-switcher.tsx';
import { useBoardStore } from '@stores/board.store.ts';
import { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { useToast } from '@contexts/toast-context.tsx';

type NavBarProps = {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
};

const WSServerURL = 'ws://localhost:4000';

export default function NavBar({ onSidebarToggle, sidebarOpen }: NavBarProps) {
  const { activeProject } = useBoardStore();
  const [isBellActive, setIsBellActive] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isBellActive) return;

    const ws = new WebSocket(WSServerURL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'technical') showToast(data.message);
    };

    ws.onopen = () => showToast('Notification is ON');
    ws.onclose = () => showToast('Notification is OFF');

    return () => ws.close();
  }, [isBellActive]);

  return (
    <nav className='navbar bg-base-100 shadow-sm px-4'>
      <div className='flex justify-between w-full'>
        <div className='flex items-center gap-2'>
          <Link to='/' className='btn btn-ghost normal-case text-xl'>
            {activeProject?.title}
          </Link>

          {onSidebarToggle && (
            <button
              className='btn btn-square btn-ghost lg:hidden'
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              onClick={onSidebarToggle}
              type='button'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          )}
        </div>

        <div className='flex items-center justify-end gap-3'>
          <button
            type='button'
            onClick={() => setIsBellActive((prev) => !prev)}
            className={`
              btn btn-ghost btn-circle
              transition-all duration-200
              ${isBellActive ? 'text-warning animate-pulse' : 'text-base-content/40'}
            `}
            title={isBellActive ? 'Отключить уведомления' : 'Включить уведомления'}>
            {isBellActive ? <Bell className='w-5 h-5' /> : <BellOff className='w-5 h-5' />}
          </button>

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
