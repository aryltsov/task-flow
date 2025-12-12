import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.hook.ts';

export default function NonAuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, initialized } = useAuth();
  if (!initialized) return null;
  if (isAuthenticated) return <Navigate to='/dashboard' replace />;
  return <>{children}</>;
}
