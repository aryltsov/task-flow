import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@pages/dashboard/dashboard-layout.tsx';

const ProjectsListPage = lazy(() => import('../pages/dashboard/projects/projects.tsx'));
const ProjectPage = lazy(() => import('../pages/dashboard/kanban/dashboard.tsx'));
const TaskModalController = lazy(() => import('../controllers/task-modal-controller.tsx'));

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to='projects' replace />} />

      <Route
        path='projects'
        element={
          <DashboardLayout>
            <Suspense fallback={null}>
              <ProjectsListPage />
            </Suspense>
          </DashboardLayout>
        }
      />

      <Route
        path='projects/:projectId/*'
        element={
          <DashboardLayout>
            <Suspense fallback={null}>
              <ProjectPage />
            </Suspense>
          </DashboardLayout>
        }>
        <Route
          path='tasks/:taskId'
          element={
            <Suspense fallback={null}>
              <TaskModalController />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
