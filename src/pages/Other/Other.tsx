import { useState } from 'react';
import EmployeesModal from '../../components/EmployeesModal';
import styles from './Other.module.css';

const otherItems = [
  { id: 'employees', title: 'Сотрудники', description: 'Справочник сотрудников организации' },
  { id: 'counterparties', title: 'Контрагенты', description: 'Справочник контрагентов' },
  { id: 'templates', title: 'Шаблоны документов', description: 'Сохранённые шаблоны для быстрого создания документов' },
];

const Other = () => {
  const [employeesOpen, setEmployeesOpen] = useState(false);

  return (
    <>
      <div className={styles.page}>
        <h1 className={styles.title}>Прочее</h1>
        <div className={styles.grid}>
          {otherItems.map(item => (
            <button
              key={item.id}
              type="button"
              className={styles.card}
              onClick={() => {
                if (item.id === 'employees') setEmployeesOpen(true);
              }}
            >
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="#B2B8BF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      {employeesOpen && <EmployeesModal onClose={() => setEmployeesOpen(false)} />}
    </>
  );
};

export default Other;
