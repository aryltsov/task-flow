import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './theme-switcher';
import { type JSX } from 'react';
import { type AuthContextType } from '../contexts/auth.context';
import { useAuth } from '../hooks/use-auth.hook.ts';
import Avatar from './avatar.tsx';

type NavBarProps = {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
};

export default function NavBar({ onSidebarToggle, sidebarOpen }: NavBarProps): JSX.Element {
  const auth: AuthContextType = useAuth();
  const navigate = useNavigate();

  // TODO move logout logic to auth context
  const handleLogout = async () => {
    try {
      if (auth?.logout) {
        auth.logout();
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <nav className='navbar bg-base-100 shadow-sm px-4'>
      <div className='flex justify-between w-full'>
        <div className='flex items-center gap-2'>
          {/* Sidebar toggle button (visible on mobile only) */}
          <div>
            <Link to='/' className='btn btn-ghost normal-case text-xl'>
              Task Flow
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
          {auth.user && (
            <>
              <Avatar name={auth.user.name || auth.user.email} avatarUrl={auth.user.avatarUrl} rtl />

              <button onClick={handleLogout} className='btn btn-sm btn-outline btn-error'>
                Logout
              </button>
            </>
          )}

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
