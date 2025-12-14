import { createContext, useState, useEffect, type ReactNode } from 'react';

export type Credentials = { email: string; password: string };

export class User {
  email: string;
  name: string;
  avatarUrl: string;
  id: string;

  constructor(email: string) {
    this.email = email;
    this.name = 'Ryltsov Anton';
    this.avatarUrl = '';
    this.id = 'a1b2c3d4-1111-4444-8888-000000000111';
  }
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const LS_KEY = 'app_user';

function getCurrentUserSync(): User | null {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveUser(user: User | null) {
  if (user === null) localStorage.removeItem(LS_KEY);
  else localStorage.setItem(LS_KEY, JSON.stringify(user));
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialUser = getCurrentUserSync();
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const login = async (credentials: Credentials) => {
    const newUser = new User(credentials.email);
    setUser(newUser);
    saveUser(newUser);
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
