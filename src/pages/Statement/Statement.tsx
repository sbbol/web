import styles from './Statement.module.css';

const Statement = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>Выписка</h1>

    <div className={styles.card}>
      <div className={styles.tabs}>
        {['ПО СЧЕТАМ', 'ПО КОРПОКАРТАМ', 'РЕЕСТР ОСТАТКОВ', 'ОТЧЕТ', 'ВЫПИСКА ПО РАСПИСАНИЮ'].map((tab, i) => (
          <button key={tab} type="button" className={`${styles.tab} ${i === 0 ? styles.tabActive : ''}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.filters}>
        <div className={styles.filterDropdown}>
          <span>Все валюты • Все счета</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.filterDropdown}>
          <span>Сегодня</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <button type="button" className={styles.resetLink}>Сбросить фильтры</button>
        <div className={styles.checkboxes}>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            Показывать нулевые обороты
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            Показывать выписку за каждый день
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            Показывать переоценку
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.submitBtn}>Сформировать выписку</button>
      </div>
    </div>
  </div>
);

export default Statement;
