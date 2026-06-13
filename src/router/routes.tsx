import { lazy } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Statement = lazy(() => import('../pages/Statement'));
const AccountInfo = lazy(() => import('../pages/AccountInfo'));
const InstantPaymentPage = lazy(() => import('../pages/InstantPayment'));
const PaymentOrderPage = lazy(() => import('../pages/PaymentOrder'));
const Products = lazy(() => import('../pages/Products'));
const CardManagement = lazy(() => import('../pages/CardManagement'));
const CardApplications = lazy(() => import('../pages/CardApplications'));
const ServicePackageNotices = lazy(() => import('../pages/ServicePackageNotices'));
const ServicePackageForm = lazy(() => import('../pages/ServicePackageForm'));
const CorporateCardForm = lazy(() => import('../pages/CorporateCardForm'));
const BusinessCardForm = lazy(() => import('../pages/BusinessCardForm'));
const Other = lazy(() => import('../pages/Other'));

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
  { path: '/products', element: <Products /> },
  { path: '/products/card-management', element: <CardManagement /> },
  { path: '/products/card-applications', element: <CardApplications /> },
  { path: '/products/service-package-notices', element: <ServicePackageNotices /> },
  { path: '/products/service-package-form', element: <ServicePackageForm /> },
  { path: '/products/corporate-card-form', element: <CorporateCardForm /> },
  { path: '/products/business-card-form', element: <BusinessCardForm /> },
  { path: '/services', element: <Dashboard /> },
  { path: '/other', element: <Other /> },
  { path: '/settings', element: <Dashboard /> },
  { path: '/account_info/:id', element: <AccountInfo /> },
  { path: '/instant-payment', element: <InstantPaymentRoute /> },
  { path: '/payment-order', element: <PaymentOrderRoute /> },
];
