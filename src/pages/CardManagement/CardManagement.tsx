import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DocumentListPage from '../../components/DocumentListPage';
import CardDocumentModal from '../../components/CardDocumentModal';
import { fetchCards, type CardListItem } from '../../api/data';

const CardManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState<CardListItem[]>([]);
  const [selectedCardId, setSelectedCardId] = useState('4521');
  const [searchParams] = useSearchParams();

  const loadCards = async () => {
    try {
      const data = await fetchCards();
      setItems(data.items);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    const cardId = searchParams.get('cardId');
    if (cardId) setSelectedCardId(cardId);
    if (searchParams.get('open') === 'block') {
      setModalOpen(true);
    }
  }, [searchParams]);

  const openCard = (cardId: string) => {
    setSelectedCardId(cardId);
    setModalOpen(true);
  };

  return (
    <>
      <DocumentListPage
        title="Управление картами"
        onCreateDocument={() => setModalOpen(true)}
        items={items}
        onItemClick={(item) => openCard(item.id)}
      />
      {modalOpen && (
        <CardDocumentModal
          cardId={selectedCardId}
          onClose={() => setModalOpen(false)}
          onStatusChanged={loadCards}
        />
      )}
    </>
  );
};

export default CardManagement;
