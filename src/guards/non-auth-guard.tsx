import { Navigate } from 'react-router-dom';
import AuthRoutes from '@routes/auth.tsx';
import { useAuth } from '@hooks/use-auth.ts';

export default function NonAuthGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to='/dashboard' replace />;

  return <AuthRoutes />;
}
