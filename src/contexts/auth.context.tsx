import { createContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthContextType } from '@models/auth-context-type.interface.ts';
import type { User } from '@models/user.interface.ts';
import type { Credentials } from '@models/credentials.ts';
import { ROUTES } from '@routes/paths.ts';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (!res.ok) throw new Error('Not authenticated');
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: Credentials) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const { auth } = await import('../firebase');
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    const idToken = await userCredential.user.getIdToken();

    // send a token to the backend to set the httpOnly cookie.
    const res = await fetch('/sessionLogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Login failed');
    }

    await checkAuth();
  };

  const logout = async () => {
    await fetch('/sessionLogout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    navigate(ROUTES.auth.login, { replace: true });
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
