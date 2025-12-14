import React from 'react';
import { Link } from 'react-router-dom';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, children }) => {
  return (
    <div className={`drawer lg:drawer-open`}>
      <input id='dashboard-sidebar' type='checkbox' className='drawer-toggle' checked={open} onChange={onClose} readOnly />
      <div className='drawer-content'>
        {/* Main content */}
        {children}
      </div>
      <div className='drawer-side !z-20'>
        <aside className='menu p-4 w-64 min-h-full bg-base-200 text-base-content border-r'>
          <ul>
            <li>
              <Link to='/dashboard/projects'>Projects</Link>
            </li>
            <li>
              <Link to='/'>Settings</Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
