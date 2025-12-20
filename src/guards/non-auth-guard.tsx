import { Navigate } from 'react-router-dom';
import AuthRoutes from '@routes/auth.tsx';
import { useAuth } from '@hooks/use-auth.ts';
import { ROUTES } from '@routes/paths.ts';

export default function NonAuthGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to={ROUTES.dashboard.root} replace />;

  return <AuthRoutes />;
}
