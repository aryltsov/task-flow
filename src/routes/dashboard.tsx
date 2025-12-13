import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../components/loader.tsx';

const DashboardPage = lazy(() => import('../pages/dashboard/dashboard'));

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<Loader text='Loading Dashboard routes...' />}>
            <DashboardPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
