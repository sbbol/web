import { useState } from 'react';
import Modal from '../Modal';
import styles from './CardDocumentModal.module.css';

interface Props {
  onClose: () => void;
}

const CardDocumentModal = ({ onClose }: Props) => {
  const [blocked, setBlocked] = useState(false);

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
          <button type="button" className={styles.btnPrimary} onClick={onClose}>
            Сохранить
          </button>
        </>
      }
    >
      <div className={styles.content}>
        <div className={styles.cardPreview}>
          <div className={styles.cardVisual}>
            <div className={styles.cardChip} />
            <div className={styles.cardNumber}>**** **** **** 4521</div>
            <div className={styles.cardMeta}>
              <span>CORPORATE</span>
              <span>12/28</span>
            </div>
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Тип карты</span>
              <span className={styles.infoValue}>Корпоративная карта</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Держатель</span>
              <span className={styles.infoValue}>DEMO IURIDICHESKOE LITCO</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Счёт</span>
              <span className={styles.infoValue}>BY51 BPSB 3012 2222 2222 2933 2222</span>
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
            onClick={() => setBlocked(v => !v)}
          >
            {blocked ? 'Разблокировать карту' : 'Заблокировать карту'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CardDocumentModal;
