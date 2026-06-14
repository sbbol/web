import { useEffect, useState } from 'react';
import Modal from '../Modal';
import NewEmployeeModal, { type EmployeePrefill } from '../NewEmployeeModal';
import { consumePrefill } from '../../utils/deepLinks';
import { deleteEmployee, fetchEmployees, type Employee } from '../../api/data';
import styles from './EmployeesModal.module.css';

interface Props {
  onClose: () => void;
  autoOpenNew?: boolean;
}

const EmployeesModal = ({ onClose, autoOpenNew }: Props) => {
  const [tab, setTab] = useState<'all' | 'favorites'>('all');
  const [search, setSearch] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmployeeOpen, setNewEmployeeOpen] = useState(false);
  const [employeePrefill, setEmployeePrefill] = useState<EmployeePrefill | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      setEmployees(await fetchEmployees());
    } catch {
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    const data = consumePrefill('/other');
    if (data && Object.keys(data).length > 0) {
      setEmployeePrefill(data as EmployeePrefill);
      setNewEmployeeOpen(true);
    } else if (autoOpenNew) {
      setNewEmployeeOpen(true);
    }
  }, [autoOpenNew]);

  const filtered = employees.filter(e =>
    e.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить сотрудника?')) return;
    setDeletingId(id);
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch {
      window.alert('Не удалось удалить сотрудника');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Modal
        title="Сотрудники"
        onClose={onClose}
        width={960}
        footer={
          <span className={styles.footerText}>
            Отображено записей: {filtered.length} из {employees.length}
          </span>
        }
      >
        <div className={styles.toolbar}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${tab === 'all' ? styles.tabActive : ''}`}
              onClick={() => setTab('all')}
            >
              Все
            </button>
            <button
              type="button"
              className={`${styles.tab} ${tab === 'favorites' ? styles.tabActive : ''}`}
              onClick={() => setTab('favorites')}
            >
              Избранные
            </button>
          </div>
          <div className={styles.searchWrap}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5" stroke="#B2B8BF" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="#B2B8BF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Поиск сотрудника"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.toolbarActions}>
            <button type="button" className={styles.newBtn} onClick={() => setNewEmployeeOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                <path d="M3 14C3 11.2386 5.23858 9 8 9C10.7614 9 13 11.2386 13 14" stroke="currentColor" strokeWidth="1.2" />
                <path d="M12 3H14M13 2V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Новый сотрудник
            </button>
            <button type="button" className={styles.settingsBtn} aria-label="Настройки">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6Z" fill="#B2B8BF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.39557 0C7.96905 0 7.58947 0.270531 7.4503 0.67371L6.85272 2.40493L5.2035 1.60713C4.82 1.42045 4.36031 1.49756 4.05871 1.79916L1.79928 4.05858C1.49769 4.36018 1.42058 4.81987 1.60726 5.20337L2.40736 6.84701L0.673709 7.45022C0.270531 7.58939 0 7.96897 0 8.39549V11.5885C0 12.015 0.270531 12.3946 0.673709 12.5338L2.40505 13.1314L1.60201 14.7914C1.41533 15.1749 1.49244 15.6346 1.79403 15.9362L4.04793 18.1901C4.34952 18.4917 4.80922 18.5688 5.19272 18.3821L6.84714 17.5767L8.39557 19.3263C8.595 19.7295 8.97458 20 9.4011 20H11.5831C12.0096 20 12.3892 19.7295 12.5284 19.3263L13.1315 17.579L14.8021 18.3872C15.1856 18.5739 15.6453 18.4968 15.9469 18.1952L18.1954 15.9468C18.497 15.6452 18.5741 15.1855 18.3874 14.802L17.5769 13.137L19.3263 12.5283C19.7295 12.3891 20 12.0096 20 11.583V8.40093C20 7.97441 19.7295 7.59483 19.3263 7.45566L17.5792 6.85259L18.3821 5.19276C18.5688 4.80926 18.4917 4.34957 18.1901 4.04797L15.9361 1.79399C15.6345 1.49239 15.1748 1.41529 14.7913 1.60197L13.1371 2.40724L12.5339 0.673709C12.3948 0.270531 12.0152 0 11.5887 0H8.39557Z" fill="#B2B8BF" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.tableHeader}>
          <span className={styles.colCheck} />
          <span className={styles.colName}>Имя</span>
          <span className={styles.colAccount}>Лицевой счет</span>
          <span className={styles.colActions} />
        </div>

        <div className={styles.list}>
          {loading && <div className={styles.loading}>Загрузка…</div>}
          {!loading && filtered.map(emp => (
            <div key={emp.id} className={styles.row}>
              <span className={styles.colCheck}>
                <input type="checkbox" aria-label={`Выбрать ${emp.fullName}`} />
              </span>
              <div className={styles.colName}>
                <div className={styles.avatar}>{emp.initials}</div>
                <div>
                  <div className={styles.empName}>{emp.fullName}</div>
                  {emp.position && <div className={styles.empSub}>{emp.position}</div>}
                </div>
              </div>
              <span className={styles.colAccount}>{emp.account}</span>
              <div className={styles.colActions}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  aria-label={`Удалить ${emp.fullName}`}
                  disabled={deletingId === emp.id}
                  onClick={() => handleDelete(emp.id)}
                >
                  {deletingId === emp.id ? '…' : 'Удалить'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {newEmployeeOpen && (
        <NewEmployeeModal
          onClose={() => setNewEmployeeOpen(false)}
          onSaved={() => { setNewEmployeeOpen(false); loadEmployees(); }}
          prefill={employeePrefill}
        />
      )}
    </>
  );
};

export default EmployeesModal;
