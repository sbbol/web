import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Account } from '../../store/AppContext';
import AccountDetailsModal from '../AccountDetailsModal/AccountDetailsModal';
import styles from './AccountOperationsView.module.css';

interface Props {
  account: Account;
  showBack?: boolean;
}

const AccountOperationsView = ({ account, showBack = true }: Props) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'operations' | 'tariff'>('operations');
  const [requisitesOpen, setRequisitesOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        {showBack && (
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate('/dashboard')}
            aria-label="Назад"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <div className={styles.currencyBadge}>
          <span>{account.currencyCode}</span>
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.iban}>BY51 BPSB 3012 2222 2222 2933 2222</div>
          <div className={styles.accountType}>Текущий (расчетный) счет</div>
          <div className={styles.nickname}>
            крутой
            <button type="button" className={styles.editNickname} aria-label="Редактировать">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10 2L12 4L5 11H3V9L10 2Z" stroke="white" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>
        <button type="button" className={styles.statementBtn}>
          <span>Выписка</span>
          <span className={styles.statementDivider} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 5L6 8L9 5" stroke="#107F8C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={styles.tabBar}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === 'operations' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('operations')}
          >
            Операции
          </button>
          <button
            type="button"
            className={`${styles.tab} ${activeTab === 'tariff' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('tariff')}
          >
            Тарифный план
          </button>
        </div>
        <button type="button" className={styles.requisitesBtn} onClick={() => setRequisitesOpen(true)}>
          Реквизиты
        </button>
      </div>

      <div className={styles.filters}>
        <button type="button" className={styles.filterDropdown}>
          <span>За все время</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className={styles.filterDropdown}>
          <span>Все операции</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className={styles.filterLink}>
          Другие фильтры
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className={styles.filterRight}>
          <button type="button" className={styles.resetLink}>Сбросить фильтры</button>
          <span className={styles.helpIcon} title="Подсказка">?</span>
        </div>
      </div>

      <div className={styles.emptyState}>
        <svg className={styles.emptyIcon} width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden>
          <circle cx="80" cy="28" r="14" stroke="#107F8C" strokeWidth="2" />
          <path d="M80 38V44" stroke="#107F8C" strokeWidth="2" strokeLinecap="round" />
          <path d="M80 44H80.01" stroke="#107F8C" strokeWidth="3" strokeLinecap="round" />
          <rect x="48" y="52" width="64" height="48" rx="4" stroke="#107F8C" strokeWidth="2" />
          <path d="M58 68H102" stroke="#107F8C" strokeWidth="2" strokeLinecap="round" />
          <path d="M58 78H90" stroke="#107F8C" strokeWidth="2" strokeLinecap="round" />
          <circle cx="68" cy="88" r="3" fill="#107F8C" />
          <circle cx="80" cy="88" r="3" fill="#107F8C" />
          <path d="M92 88C92 88 96 84 102 88" stroke="#107F8C" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className={styles.emptyText}>
          По заданным параметрам фильтрации информация о движении денежных средств отсутствует
        </p>
        <button type="button" className={styles.resetLink}>Сбросить фильтры</button>
      </div>

      {requisitesOpen && (
        <AccountDetailsModal account={account} onClose={() => setRequisitesOpen(false)} />
      )}
    </div>
  );
};

export default AccountOperationsView;
