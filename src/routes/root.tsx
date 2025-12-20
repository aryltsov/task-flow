import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import AuthGuard from '@guards/auth-guard';
import NonAuthGuard from '@guards/non-auth-guard';
import NotFound from '@pages/not-found';
import ErrorFallback from '@components/error-fallback';
import { ROUTE_PATTERNS } from '@routes/paths.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: `${ROUTE_PATTERNS.dashboard.root}/*`,
        element: <AuthGuard />,
      },
      {
        path: `${ROUTE_PATTERNS.auth.login}/*`,
        element: <NonAuthGuard />,
      },
      { index: true, element: <Navigate to='dashboard' replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
