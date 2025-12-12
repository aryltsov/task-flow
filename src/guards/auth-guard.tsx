import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.hook.ts';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, initialized } = useAuth();
  if (!initialized) return null;
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  return <>{children}</>;
}
