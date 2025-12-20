import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import DashboardLayout from '@pages/dashboard/dashboard-layout.tsx';
import TaskModalController from '@controllers/task-modal-controller.tsx';
import ProjectModalController from '@controllers/project-modal-controller.tsx';
import { lazy } from 'react';
import { ROUTE_PATTERNS } from '@routes/paths.ts';

const ProjectsListPage = lazy(() => import('@pages/dashboard/projects/projects.tsx'));
const ProjectPage = lazy(() => import('@pages/dashboard/kanban/dashboard.tsx'));

export default function DashboardRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to='projects' replace />} />
          <Route path={ROUTE_PATTERNS.projects.root} element={<ProjectsListPage />} />
          <Route path={ROUTE_PATTERNS.projects.tasks.root} element={<ProjectPage />} />
        </Route>
      </Routes>

      <Routes>
        <Route path={ROUTE_PATTERNS.projects.tasks.view} element={<TaskModalController />} />
        <Route path={ROUTE_PATTERNS.projects.view} element={<ProjectModalController />} />
      </Routes>
    </>
  );
}
