import { useNavigate } from 'react-router-dom';
import DocumentListPage from '../../components/DocumentListPage';

const ServicePackageNotices = () => {
  const navigate = useNavigate();

  return (
    <DocumentListPage
      title="Извещения о смене (подключении) пакета услуг"
      onCreateDocument={() => navigate('/products/service-package-form')}
    />
  );
};

export default ServicePackageNotices;
