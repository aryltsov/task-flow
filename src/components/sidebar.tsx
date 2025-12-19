import React from 'react';
import { Link } from 'react-router-dom';
import type { AuthContextType } from '@models/auth-context-type.interface.ts';
import { useAuth } from '@hooks/use-auth.ts';
import Avatar from '@components/avatar.tsx';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, children }) => {
  const auth: AuthContextType = useAuth();

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
            <div className='font-bold text-lg mb-4'>{auth.user && <Avatar name={auth.user.email} />}</div>
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
              <button onClick={() => auth?.logout()} className='btn btn-lg btn-primary w-full'>
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
