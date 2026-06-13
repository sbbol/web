import type { ReactNode } from 'react';
import styles from './DocumentListPage.module.css';

export interface DocumentListItem {
  id: string;
  number: string;
  date: string;
  status: string;
  statusType?: 'draft' | 'signed' | 'processing';
}

interface Props {
  title: string;
  onCreateDocument: () => void;
  items?: DocumentListItem[];
  emptyText?: string;
  children?: ReactNode;
}

const DocumentListPage = ({
  title,
  onCreateDocument,
  items = [],
  emptyText = 'Документы отсутствуют',
  children,
}: Props) => (
  <div className={styles.page}>
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <button type="button" className={styles.createBtn} onClick={onCreateDocument}>
        Создать документ
      </button>
    </div>

    <div className={styles.card}>
      <div className={styles.toolbar}>
        <div className={styles.tabs}>
          <button type="button" className={`${styles.tab} ${styles.tabActive}`}>Все</button>
          <button type="button" className={styles.tab}>Черновики</button>
          <button type="button" className={styles.tab}>На подписи</button>
          <button type="button" className={styles.tab}>Исполненные</button>
        </div>
        <div className={styles.searchWrap}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#B2B8BF" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="#B2B8BF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input type="text" placeholder="Поиск документа" />
        </div>
      </div>

      {children}

      {items.length > 0 ? (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>№ документа</span>
            <span>Дата</span>
            <span>Статус</span>
            <span />
          </div>
          {items.map(item => (
            <div key={item.id} className={styles.tableRow}>
              <span className={styles.docNumber}>{item.number}</span>
              <span>{item.date}</span>
              <span className={`${styles.status} ${styles[`status_${item.statusType ?? 'draft'}`]}`}>
                {item.status}
              </span>
              <button type="button" className={styles.menuBtn} aria-label="Действия">
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                  <circle cx="2" cy="2" r="2" fill="#B2B8BF" />
                  <circle cx="2" cy="8" r="2" fill="#B2B8BF" />
                  <circle cx="2" cy="14" r="2" fill="#B2B8BF" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>{emptyText}</div>
      )}
    </div>
  </div>
);

export default DocumentListPage;
