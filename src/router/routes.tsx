import { lazy } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Statement = lazy(() => import('../pages/Statement'));
const AccountInfo = lazy(() => import('../pages/AccountInfo'));
const InstantPaymentPage = lazy(() => import('../pages/InstantPayment'));
const PaymentOrderPage = lazy(() => import('../pages/PaymentOrder'));

const InstantPaymentRoute = () => {
  const navigate = useNavigate();
  return <InstantPaymentPage onClose={() => navigate('/dashboard')} />;
};

const PaymentOrderRoute = () => {
  const navigate = useNavigate();
  return <PaymentOrderPage onClose={() => navigate('/dashboard')} />;
};

export const routes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/payments', element: <Dashboard /> },
  { path: '/statement', element: <Statement /> },
  { path: '/salary', element: <Dashboard /> },
  { path: '/products', element: <Dashboard /> },
  { path: '/services', element: <Dashboard /> },
  { path: '/other', element: <Dashboard /> },
  { path: '/settings', element: <Dashboard /> },
  { path: '/account_info/:id', element: <AccountInfo /> },
  { path: '/instant-payment', element: <InstantPaymentRoute /> },
  { path: '/payment-order', element: <PaymentOrderRoute /> },
];
