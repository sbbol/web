import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Account } from '../../store/AppContext';
import {
  fetchAccountOperations,
  fetchAccountOperationsReference,
  type AccountOperation,
  type AccountOperationsReference,
} from '../../api/data';
import AccountDetailsModal from '../AccountDetailsModal/AccountDetailsModal';
import styles from './AccountOperationsView.module.css';

interface Props {
  account: Account;
  showBack?: boolean;
  initialRequisitesOpen?: boolean;
}

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return iso;
  return `${day}.${month}.${year}`;
};

const AccountOperationsView = ({ account, showBack = true, initialRequisitesOpen = false }: Props) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'operations' | 'tariff'>('operations');
  const [requisitesOpen, setRequisitesOpen] = useState(initialRequisitesOpen);
  const [reference, setReference] = useState<AccountOperationsReference | null>(null);
  const [period, setPeriod] = useState('all');
  const [operationType, setOperationType] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<'period' | 'type' | null>(null);
  const [transactions, setTransactions] = useState<AccountOperation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialRequisitesOpen) setRequisitesOpen(true);
  }, [initialRequisitesOpen]);

  useEffect(() => {
    fetchAccountOperationsReference(account.id)
      .then(setReference)
      .catch(() => {});
  }, [account.id]);

  const loadOperations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAccountOperations(account.id, {
        period,
        operation_type: operationType,
      });
      setTransactions(data.transactions);
    } catch {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [account.id, period, operationType]);

  useEffect(() => {
    if (activeTab === 'operations') {
      loadOperations();
    }
  }, [activeTab, loadOperations]);

  const periodLabel = reference?.periods.find(p => p.key === period)?.label || 'За все время';
  const typeLabel = reference?.operationTypes.find(t => t.key === operationType)?.label || 'Все операции';

  const handleReset = () => {
    setPeriod('all');
    setOperationType('all');
    setOpenDropdown(null);
  };

  const goToStatement = () => {
    navigate(`/statement?account=${account.id}`);
  };

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
          <div className={styles.iban}>{account.number}</div>
          <div className={styles.accountType}>{account.name}</div>
          {account.description && (
            <div className={styles.nickname}>{account.description}</div>
          )}
        </div>
        <button type="button" className={styles.statementBtn} onClick={goToStatement}>
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

      {activeTab === 'operations' && (
        <>
          <div className={styles.filters}>
            <div className={styles.dropdownWrap}>
              <button
                type="button"
                className={styles.filterDropdown}
                onClick={() => setOpenDropdown(openDropdown === 'period' ? null : 'period')}
              >
                <span>{periodLabel}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {openDropdown === 'period' && (
                <div className={styles.dropdownMenu}>
                  {(reference?.periods || [{ key: 'all', label: 'За все время' }]).map(opt => (
                    <button
                      key={opt.key}
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setPeriod(opt.key);
                        setOpenDropdown(null);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.dropdownWrap}>
              <button
                type="button"
                className={styles.filterDropdown}
                onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
              >
                <span>{typeLabel}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {openDropdown === 'type' && (
                <div className={styles.dropdownMenu}>
                  {(reference?.operationTypes || [{ key: 'all', label: 'Все операции' }]).map(opt => (
                    <button
                      key={opt.key}
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setOperationType(opt.key);
                        setOpenDropdown(null);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.filterRight}>
              <button type="button" className={styles.resetLink} onClick={handleReset}>
                Сбросить фильтры
              </button>
              <span className={styles.helpIcon} title="Подсказка">?</span>
            </div>
          </div>

          {loading ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>Загрузка операций…</p>
            </div>
          ) : transactions.length === 0 ? (
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
              <button type="button" className={styles.resetLink} onClick={handleReset}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className={styles.operationsList}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Описание</th>
                    <th>Дебет</th>
                    <th>Кредит</th>
                    <th>Остаток</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, i) => (
                    <tr key={`${tx.date}-${tx.description}-${i}`}>
                      <td>{formatDate(tx.date)}</td>
                      <td>{tx.description}</td>
                      <td className={styles.debit}>{tx.debit || '—'}</td>
                      <td className={styles.credit}>{tx.credit || '—'}</td>
                      <td>{tx.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === 'tariff' && (
        <div className={styles.tariffPanel}>
          <p className={styles.tariffTitle}>Тарифный план счёта</p>
          <div className={styles.tariffRow}>
            <span className={styles.tariffLabel}>Счёт</span>
            <span>{account.number}</span>
          </div>
          <div className={styles.tariffRow}>
            <span className={styles.tariffLabel}>Наименование</span>
            <span>{account.name}</span>
          </div>
          <div className={styles.tariffRow}>
            <span className={styles.tariffLabel}>Валюта</span>
            <span>{account.currencyCode}</span>
          </div>
          {!account.noInfo && (
            <div className={styles.tariffRow}>
              <span className={styles.tariffLabel}>Текущий остаток</span>
              <span>{account.balance} {account.currencyCode}</span>
            </div>
          )}
        </div>
      )}

      {requisitesOpen && (
        <AccountDetailsModal account={account} onClose={() => setRequisitesOpen(false)} />
      )}
    </div>
  );
};

export default AccountOperationsView;
