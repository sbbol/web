import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentListPage from '../../components/DocumentListPage';
import NewDocumentModal from '../../components/NewDocumentModal';

const CardApplications = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelect = (id: string) => {
    setModalOpen(false);
    if (id === 'corp-card') navigate('/products/corporate-card-form');
    if (id === 'business-card') navigate('/products/business-card-form');
  };

  return (
    <>
      <DocumentListPage
        title="Заявления на получение корпоративных карт / бизнес-карт"
        onCreateDocument={() => setModalOpen(true)}
      />
      {modalOpen && (
        <NewDocumentModal
          variant="cards"
          onClose={() => setModalOpen(false)}
          onSelect={handleSelect}
        />
      )}
    </>
  );
};

export default CardApplications;
