import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import NonAuthGuard from '../guards/non-auth-guard.tsx';
import AuthGuard from '../guards/auth-guard.tsx';

const DashboardRoutes = lazy(() => import('./dashboard'));
const AuthRoutes = lazy(() => import('./auth'));
const NotFound = lazy(() => import('../pages/not-found'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'dashboard/*',
        element: (
          <AuthGuard>
            <DashboardRoutes />
          </AuthGuard>
        ),
      },
      {
        path: 'login/*',
        element: (
          <NonAuthGuard>
            <AuthRoutes />
          </NonAuthGuard>
        ),
      },
      { index: true, element: <Navigate to='dashboard' replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
