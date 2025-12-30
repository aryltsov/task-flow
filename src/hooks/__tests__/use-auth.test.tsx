import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AuthContext } from '@contexts/auth.context';
import { useAuth } from '../use-auth';

describe('useAuth', () => {
  it('returns auth context', () => {
    const authValue = {
      user: {
        id: '1',
        name: 'Anton',
        email: 'anton@test.com',
      },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      checkAuth: jest.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user!.name).toBe('Anton');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('throws error outside provider', () => {
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used within AuthProvider');
  });
});
