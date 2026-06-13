import Modal from '../Modal';
import styles from './NewDocumentModal.module.css';
import { paymentDocuments, cardDocuments, type DocumentTile } from './documentIcons';

interface Props {
  onClose: () => void;
  variant?: 'payments' | 'cards';
  onSelect?: (id: string) => void;
}

const DocumentGrid = ({
  items,
  onSelect,
}: {
  items: DocumentTile[];
  onSelect?: (id: string) => void;
}) => (
  <div className={styles.grid}>
    {items.map(item => (
      <button
        key={item.id}
        type="button"
        className={styles.tile}
        onClick={() => onSelect?.(item.id)}
      >
        <span className={styles.iconWrap}>
          <span className={styles.iconGray}>{item.icon}</span>
          <span className={styles.iconColor}>{item.coloredIcon}</span>
        </span>
        <span className={styles.tileLabel}>
          {item.label}
          {item.hasInfo && (
            <span className={styles.infoIcon} title="Подробнее">?</span>
          )}
          {item.hasChevron && (
            <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#B2B8BF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>
    ))}
  </div>
);

const NewDocumentModal = ({
  onClose,
  variant = 'payments',
  onSelect,
}: Props) => {
  const items = variant === 'cards' ? cardDocuments : paymentDocuments;

  return (
    <Modal title="Новый документ" onClose={onClose} width={960}>
      <DocumentGrid items={items} onSelect={onSelect} />
    </Modal>
  );
};

export default NewDocumentModal;
