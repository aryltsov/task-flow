import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.hook';
import AuthRoutes from '../routes/auth.tsx';

export default function NonAuthGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to='/dashboard' replace />;

  return <AuthRoutes />;
}
