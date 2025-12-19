import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import AuthGuard from '@guards/auth-guard';
import NonAuthGuard from '@guards/non-auth-guard';
import NotFound from '@pages/not-found';
import ErrorFallback from '@components/error-fallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      {
        path: 'dashboard/*',
        element: <AuthGuard />,
      },
      {
        path: 'login/*',
        element: <NonAuthGuard />,
      },
      { index: true, element: <Navigate to='dashboard' replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
