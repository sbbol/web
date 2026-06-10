// pages/AccountInfo/index.tsx

import {
    useContext,
  } from 'react';
  
  import {
    useParams,
  } from 'react-router-dom';
  
  import { AppContext } from '../../store/AppContext';
  import styles from './AccountInfo.module.css';
  
  const AccountInfo = () => {
    const { id } = useParams();
  
    const { accounts } =
      useContext(AppContext);
  
    const account = accounts.find(
      a => a.id === id
    );
  
    if (!account) {
      return <h2>Счет не найден</h2>;
    }
  
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1>{account.currency}</h1>
  
          <div>{account.number}</div>
  
          <div>{account.name}</div>
  
          <div>крутой</div>
          <div>крутой</div>
          <div>крутой</div>
  
          <button className={styles.statementBtn}>
            Выписка
          </button>
        </div>
  
        <div className={styles.tabs}>
          <button>Операции</button>
          <button>Тарифный план</button>
          <button>Реквизиты</button>
        </div>
  
        <div className={styles.filters}>
          <select>
            <option>
              За все время
            </option>
          </select>
  
          <select>
            <option>
              Все операции
            </option>
          </select>
  
          <button>
            Другие фильтры
          </button>
  
          <button>
            Сбросить фильтры
          </button>
        </div>
  
        <div className={styles.empty}>
          По заданным параметрам
          фильтрации информация о
          движении денежных средств
          отсутствует
        </div>
  
        <button className={styles.reset}>
          Сбросить фильтры
        </button>
      </div>
    );
  };
  
  export default AccountInfo;