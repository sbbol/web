import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  width?: number | 'full';
  className?: string;
}

const Modal = ({
  title,
  onClose,
  children,
  footer,
  width = 760,
  className,
}: ModalProps) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${width === 'full' ? styles.modalFull : ''} ${className ?? ''}`}
        style={width !== 'full' ? { width: `${width}px` } : undefined}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18M18 6L6 18" stroke="#B2B8BF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
