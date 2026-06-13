import { useState } from 'react';
import DocumentListPage from '../../components/DocumentListPage';
import CardDocumentModal from '../../components/CardDocumentModal';

const sampleDocs = [
  { id: '1', number: '4521', date: '13.06.2026', status: 'Активна', statusType: 'signed' as const },
  { id: '2', number: '4522', date: '10.06.2026', status: 'Черновик', statusType: 'draft' as const },
];

const CardManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <DocumentListPage
        title="Управление картами"
        onCreateDocument={() => setModalOpen(true)}
        items={sampleDocs}
      />
      {modalOpen && <CardDocumentModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default CardManagement;
