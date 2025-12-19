import { Link } from 'react-router-dom';
import ThemeSwitcher from '@components/theme-switcher.tsx';
import { useBoardStore } from '@stores/board.store.ts';

type NavBarProps = {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
};

export default function NavBar({ onSidebarToggle, sidebarOpen }: NavBarProps) {
  const { activeProject } = useBoardStore();

  return (
    <nav className='navbar bg-base-100 shadow-sm px-4'>
      <div className='flex justify-between w-full'>
        <div className='flex items-center gap-2'>
          <div>
            <Link to='/' className='btn btn-ghost normal-case text-xl'>
              {activeProject?.title}
            </Link>
          </div>

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
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
