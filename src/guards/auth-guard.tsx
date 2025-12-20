import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/use-auth.ts';
import DashboardRoutes from '@routes/dashboard.tsx';
import { ROUTES } from '@routes/paths.ts';

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={ROUTES.auth.login} replace />;

  return <DashboardRoutes />;
}
