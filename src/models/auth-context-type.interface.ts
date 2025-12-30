import type { Credentials } from '@models/credentials.ts';
import type { User } from '@models/user.interface.ts';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
