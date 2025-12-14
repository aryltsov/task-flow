import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../components/loader.tsx';
import DashboardLayout from '../pages/dashboard-layout.tsx';

const ProjectsListPage = lazy(() => import('../pages/dashboard/projects/projects.tsx'));
const ProjectPage = lazy(() => import('../pages/dashboard/kanban/dashboard.tsx'));

export default function DashboardRoutes() {
  return (
    <Routes>
      {/* Все роуты дашборда обёрнуты в DashboardLayout */}
      <Route
        path='projects'
        element={
          <DashboardLayout>
            <Suspense fallback={<Loader text='Loading Projects...' />}>
              <ProjectsListPage />
            </Suspense>
          </DashboardLayout>
        }
      />

      <Route
        path='projects/:id'
        element={
          <DashboardLayout>
            <Suspense fallback={<Loader text='Loading Project...' />}>
              <ProjectPage />
            </Suspense>
          </DashboardLayout>
        }
      />

      {/* Редирект с /dashboard на /dashboard/projects */}
      <Route index element={<Navigate to='projects' replace />} />
    </Routes>
  );
}
