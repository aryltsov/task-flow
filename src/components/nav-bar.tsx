import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './theme-switcher';
import type { JSX } from 'react';
import { type AuthContextType } from '../contexts/auth.context';
import { useAuth } from '../hooks/use-auth.hook.ts';
import Avatar from './avatar.tsx';

export default function NavBar(): JSX.Element {
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
        <Link to='/' className='btn btn-ghost normal-case text-xl'>
          Task Flow
        </Link>

        <div className='flex items-center justify-end gap-3'>
          <Avatar name={auth.user!.name || auth.user!.email} avatarUrl={auth.user!.avatarUrl} rtl={true} />
          <button onClick={handleLogout} className='btn btn-sm btn-outline btn-error'>
            Logout
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
