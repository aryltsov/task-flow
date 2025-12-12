import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/login/login'));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<div>Загрузка...</div>}>
            <LoginPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
