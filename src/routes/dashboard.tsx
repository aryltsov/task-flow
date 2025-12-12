import { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const DashboardPage = lazy(() => import('../pages/dashboard/dashboard'));

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <DashboardPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
