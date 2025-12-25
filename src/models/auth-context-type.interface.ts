import type { User, Credentials } from '@models';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
