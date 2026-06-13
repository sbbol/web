import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../store/AppContext';
import AccountDetailsModal from '../../components/AccountDetailsModal/AccountDetailsModal';
import styles from './AccountInfo.module.css';

const AccountInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<'operations' | 'tariff'>('operations');
  const [requisitesOpen, setRequisitesOpen] = useState(false);

  const account = accounts.find(a => a.id === id);

  if (!account) {
    return <h2>Счет не найден</h2>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button type="button" className={styles.backBtn} onClick={() => navigate('/dashboard')} aria-label="Назад">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
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
          Выписка
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
        <select className={styles.filterSelect} defaultValue="all">
          <option value="all">За все время</option>
        </select>
        <select className={styles.filterSelect} defaultValue="all-ops">
          <option value="all-ops">Все операции</option>
        </select>
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
        <svg className={styles.emptyIcon} width="120" height="100" viewBox="0 0 120 100" fill="none">
          <circle cx="60" cy="24" r="12" stroke="#107F8C" strokeWidth="2" />
          <path d="M60 32V36" stroke="#107F8C" strokeWidth="2" strokeLinecap="round" />
          <rect x="30" y="44" width="60" height="44" rx="4" stroke="#107F8C" strokeWidth="2" />
          <path d="M42 56H78M42 64H66" stroke="#107F8C" strokeWidth="2" strokeLinecap="round" />
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

export default AccountInfo;
