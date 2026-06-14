import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DocumentFormLayout.module.css';

interface Props {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  sidebar?: ReactNode;
  footer?: ReactNode;
}

const DocumentFormLayout = ({ title, children, onClose, sidebar, footer }: Props) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>{title}</h1>
          <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Закрыть">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="#B2B8BF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.main}>{children}</div>
          {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
        </div>
        {footer && <div className={styles.cardFooter}>{footer}</div>}
      </div>
    </div>
  );
};

export const DocMetaSidebar = () => (
  <div className={styles.metaBox}>
    <label className={styles.metaField}>
      <span>№ документа</span>
      <input type="text" defaultValue="6414030" readOnly />
    </label>
    <label className={styles.metaField}>
      <span>Дата документа</span>
      <input type="text" defaultValue="13.06.2026" />
    </label>
    <label className={styles.metaField}>
      <span>Очередность платежа</span>
      <div className={styles.metaInputWrap}>
        <input type="text" defaultValue="21" />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7H16M4 7L7 4M4 7L7 10" stroke="#B2B8BF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </label>
  </div>
);

export const DocFormFooter = ({
  primaryLabel = 'На подпись',
  onContinue,
  onSaveDraft,
}: {
  primaryLabel?: string;
  onContinue?: () => void;
  onSaveDraft?: () => void;
}) => (
  <>
    <button type="button" className={styles.draftLink} onClick={onSaveDraft}>Сохранить как черновик</button>
    <div className={styles.footerActions}>
      <button type="button" className={styles.btnOutline}>Печатная версия</button>
      <button type="button" className={styles.btnOutline}>Проверить</button>
      <button type="button" className={styles.btnPrimary} onClick={onContinue}>
        {primaryLabel}
        {primaryLabel === 'На подпись' && (
          <span className={styles.splitArrow}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5L6 8L9 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </button>
    </div>
  </>
);

export default DocumentFormLayout;
