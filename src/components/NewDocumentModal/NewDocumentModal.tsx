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
  variant,
}: {
  items: DocumentTile[];
  onSelect?: (id: string) => void;
  variant: 'payments' | 'cards';
}) => (
  <div className={`${styles.grid} ${variant === 'cards' ? styles.gridCards : ''}`}>
    {items.map(item => (
      <button
        key={item.id}
        type="button"
        className={styles.tile}
        onClick={() => onSelect?.(item.id)}
      >
        <span className={styles.iconWrap}>
          <span className={styles.iconGray}>{item.icon}</span>
          <span className={styles.iconColor}>{item.icon}</span>
        </span>
        <span className={styles.tileLabel}>
          {item.label}
          {item.hasInfo && (
            <span className={styles.infoIcon} title="Подробнее">?</span>
          )}
          {item.hasChevron && (
            <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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
  const isCards = variant === 'cards';

  return (
    <Modal
      title="Новый документ"
      onClose={onClose}
      width={isCards ? 560 : 686}
      height={isCards ? 245 : 621.78}
      bodyHeight={isCards ? 188 : 564.78}
      className={styles.modal}
      bodyClassName={styles.body}
    >
      <DocumentGrid items={items} onSelect={onSelect} variant={variant} />
    </Modal>
  );
};

export default NewDocumentModal;
