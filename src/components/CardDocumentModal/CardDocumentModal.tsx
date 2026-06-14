import { useEffect, useState } from 'react';
import Modal from '../Modal';
import { fetchCard, updateCardStatus, type Card } from '../../api/data';
import styles from './CardDocumentModal.module.css';

interface Props {
  onClose: () => void;
  cardId?: string;
  onStatusChanged?: () => void;
}

const CardDocumentModal = ({
  onClose,
  cardId = '4521',
  onStatusChanged,
}: Props) => {
  const [card, setCard] = useState<Card | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchCard(cardId)
      .then(c => {
        setCard(c);
        setBlocked(c.status === 'blocked');
      })
      .catch(() => setError('Не удалось загрузить данные карты'))
      .finally(() => setLoading(false));
  }, [cardId]);

  const handleToggle = () => {
    setBlocked(v => !v);
  };

  const handleSave = async () => {
    if (!card) return;
    const newStatus = blocked ? 'blocked' : 'active';
    if (newStatus === card.status) {
      onClose();
      return;
    }
    setSaving(true);
    setError('');
    try {
      await updateCardStatus(cardId, newStatus);
      onStatusChanged?.();
      onClose();
    } catch {
      setError('Не удалось сохранить статус карты');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Modal title="Карты" onClose={onClose} width={640}>
        <div className={styles.content}>Загрузка…</div>
      </Modal>
    );
  }

  if (!card) {
    return (
      <Modal title="Карты" onClose={onClose} width={640}>
        <div className={styles.content}>{error || 'Карта не найдена'}</div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Карты"
      onClose={onClose}
      width={640}
      footer={
        <>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Закрыть
          </button>
          <button type="button" className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
            {saving ? 'Сохранение…' : 'Сохранить'}
          </button>
        </>
      }
    >
      <div className={styles.content}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.cardPreview}>
          <div className={styles.cardVisual}>
            <div className={styles.cardChip} />
            <div className={styles.cardNumber}>{card.label.replace('**** ', '**** **** **** ')}</div>
            <div className={styles.cardMeta}>
              <span>CORPORATE</span>
              <span>{card.expiry}</span>
            </div>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Тип карты</span>
              <span className={styles.infoValue}>{card.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Держатель</span>
              <span className={styles.infoValue}>{card.holder}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Счёт</span>
              <span className={styles.infoValue}>{card.account_number}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Статус</span>
              <span className={`${styles.status} ${blocked ? styles.statusBlocked : styles.statusActive}`}>
                {blocked ? 'Заблокирована' : 'Активна'}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.blockBtn} ${blocked ? styles.unblockBtn : ''}`}
            onClick={handleToggle}
          >
            {blocked ? 'Разблокировать карту' : 'Заблокировать карту'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CardDocumentModal;
