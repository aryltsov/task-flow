import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/loader.tsx';

const LoginPage = lazy(() => import('../pages/login.tsx'));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<Loader text='Loading Auth routes...' />}>
            <LoginPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
