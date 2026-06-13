import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
  height?: number;
  bodyHeight?: number;
  footerHeight?: number;
  className?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const Modal = ({
  title,
  onClose,
  children,
  footer,
  width = 704,
  height,
  bodyHeight,
  footerHeight,
  className,
  bodyClassName,
  footerClassName,
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
        className={`${styles.modal} ${className ?? ''}`}
        style={{
          width: `${width}px`,
          ...(height ? { height: `${height}px` } : {}),
        }}
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 4L12 12M12 4L4 12" stroke="#B2B8BF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div
          className={`${styles.body} ${bodyClassName ?? ''}`}
          style={bodyHeight ? { height: `${bodyHeight}px`, flex: 'none' } : undefined}
        >
          {children}
        </div>
        {footer && (
          <div
            className={`${styles.footer} ${footerClassName ?? ''}`}
            style={footerHeight ? { height: `${footerHeight}px`, flex: 'none' } : undefined}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
