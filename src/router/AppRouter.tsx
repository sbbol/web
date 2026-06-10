// router/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { routes } from './routes';

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Редирект с корня на дашборд */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;