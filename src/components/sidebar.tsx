import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from './avatar.tsx';
import type { AuthContextType } from '../contexts/auth.context.tsx';
import { useAuth } from '../hooks/use-auth.hook.ts';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, children }) => {
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
    <div className={`drawer lg:drawer-open`}>
      <input id='dashboard-sidebar' type='checkbox' className='drawer-toggle' checked={open} onChange={onClose} readOnly />
      <div className='drawer-content'>
        {/* Main content */}
        {children}
      </div>
      <div className='drawer-side !z-20'>
        <aside className='menu p-4 w-64 min-h-full bg-base-200 text-base-content border-rflex flex-col justify-between'>
          <div>
            <div className='font-bold text-lg mb-4'>{auth.user && <Avatar name={auth.user.name || auth.user.email} avatarUrl={auth.user.avatarUrl} />}</div>
            <ul>
              <li>
                <Link to='/dashboard/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/'>Settings</Link>
              </li>
            </ul>
          </div>
          <div>
            {auth.user && (
              <button onClick={handleLogout} className='btn btn-lg btn-primary w-full'>
                Logout
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
