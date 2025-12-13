import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.hook';
import DashboardRoutes from '../routes/dashboard.tsx';

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to='/login' replace />;

  return <DashboardRoutes />;
}
