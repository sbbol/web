import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Payments = lazy(() => import('../pages/Dashboard'));
const Statement = lazy(() => import('../pages/Statement'));
const Salary = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Dashboard'));
const Services = lazy(() => import('../pages/Dashboard'));
const Other = lazy(() => import('../pages/Dashboard'));
const Settings = lazy(() => import('../pages/Dashboard'));
const AccountInfo = lazy(() => import('../pages/AccountInfo'));
const InstantPayment = lazy(() => import('../pages/InstantPayment'));
const PaymentOrder = lazy(() => import('../pages/PaymentOrder'));


export const routes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/payments', element: <Payments /> },
  { path: '/statement', element: <Statement /> },
  { path: '/salary', element: <Salary /> },
  { path: '/products', element: <Products /> },
  { path: '/services', element: <Services /> },
  { path: '/other', element: <Other /> },
  { path: '/settings', element: <Settings /> },
  { path: '/account_info/:id', element: <AccountInfo /> },
  { path: '/instant-payment', element: <InstantPayment /> },
  { path: '/payment-order', element: <PaymentOrder />, },
];