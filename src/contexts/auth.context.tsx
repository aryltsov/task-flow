import { createContext, useState, useEffect, type ReactNode } from 'react';

export type User = { email: string; password: string; name?: string; avatarUrl?: string } | null;

// todo move interface to separate file
export interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => void;
}

const LS_KEY = 'app_user';

function getCurrentUserSync(): User {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveUser(user: User) {
  if (user === null) localStorage.removeItem(LS_KEY);
  else localStorage.setItem(LS_KEY, JSON.stringify(user));
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialUser = getCurrentUserSync();
  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const login = async (data: User) => {
    setUser(data);
    saveUser(data);
  };

  const logout = () => {
    setUser(null);
    saveUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
