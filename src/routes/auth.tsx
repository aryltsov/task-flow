import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/login/login.tsx'));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={null}>
            <LoginPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
