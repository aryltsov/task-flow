import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@components/sidebar.tsx';
import NavBar from '@components/nav-bar.tsx';

type DashboardLayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    setSidebarOpen(media.matches);

    const handler = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <Sidebar open={sidebarOpen} onClose={handleSidebarToggle}>
      <NavBar onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
      <main role='main' className='w-full overflow-x-auto p-3'>
        {children}
        <Outlet />
      </main>
    </Sidebar>
  );
}
