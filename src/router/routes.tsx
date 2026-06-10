import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Payments = lazy(() => import('../pages/Dashboard'));
const Statement = lazy(() => import('../pages/Dashboard'));
const Salary = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Dashboard'));
const Services = lazy(() => import('../pages/Dashboard'));
const Other = lazy(() => import('../pages/Dashboard'));
const Settings = lazy(() => import('../pages/Dashboard'));

export const routes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/payments', element: <Payments /> },
  { path: '/statement', element: <Statement /> },
  { path: '/salary', element: <Salary /> },
  { path: '/products', element: <Products /> },
  { path: '/services', element: <Services /> },
  { path: '/other', element: <Other /> },
  { path: '/settings', element: <Settings /> },
];