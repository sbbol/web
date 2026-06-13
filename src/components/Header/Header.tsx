import { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/figma/logo.svg';
import iconPhone from '../../assets/figma/icon-phone.svg';
import iconBell from '../../assets/figma/icon-bell.svg';
import customerLogo from '../../assets/figma/customer-logo.png';

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <img src={logo} alt="СберБизнес" className={styles.logo} />
      </div>

      <div className={styles.right}>
        <button type="button" className={styles.iconBtn} title="Контакты">
          <img src={iconPhone} alt="" width={20} height={20} />
        </button>

        <button type="button" className={styles.iconBtn} title="Уведомления">
          <img src={iconBell} alt="" width={20} height={20} />
          <span className={styles.badge}>4</span>
        </button>

        <button type="button" className={styles.iconBtn} title="Сообщения">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M16 2H4C2.34315 2 1 3.34315 1 5V15C1 16.6569 2.34315 18 4 18H16C17.6569 18 19 16.6569 19 15V5C19 3.34315 17.6569 2 16 2Z" stroke="#B2B8BF" strokeWidth="2" />
            <path d="M5 7.08398L8.8 9.93398C9.51111 10.4673 10.4889 10.4673 11.2 9.93398L15 7.08398" stroke="#B2B8BF" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className={styles.badge}>4</span>
        </button>

        <div className={styles.profileWrap}>
          <button
            type="button"
            className={styles.profileBtn}
            onClick={() => setProfileOpen(v => !v)}
          >
            <img src={customerLogo} alt="" className={styles.customerLogo} />
            <span className={styles.profileName}>DEMO ЮРИДИЧЕСКОЕ ЛИЦО</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {profileOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem}>Сменить организацию</div>
              <div className={styles.dropdownItem}>Настройки</div>
              <div className={styles.dropdownItem}>Выйти</div>
            </div>
          )}
        </div>

        <button type="button" className={styles.iconBtn} title="Помощь">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 7.954C13 9.155 12.135 9.57 11.48 10.354C11.175 10.72 11.175 11.289 11 11.68C10.806 12.114 10.16 12 10 12C9.73478 12 9.48043 11.8946 9.29289 11.7071C9.10536 11.5196 9 11.2652 9 11C9 10.013 9.45 9.52 10.325 9.064C10.435 9.007 11 8.642 11 8.143C11 7.497 10.536 7 10 7C9.38 7 9 7.281 9 7.5V8.352H7.143C7.048 8.152 7 7.868 7 7.5C7 6.024 8.384 5 10 5C11.673 5 13 6.233 13 7.954ZM10 15C9.73478 15 9.48043 14.8946 9.29289 14.7071C9.10536 14.5196 9 14.2652 9 14C9 13.7348 9.10536 13.4804 9.29289 13.2929C9.48043 13.1054 9.73478 13 10 13C10.2652 13 10.5196 13.1054 10.7071 13.2929C10.8946 13.4804 11 13.7348 11 14C11 14.2652 10.8946 14.5196 10.7071 14.7071C10.5196 14.8946 10.2652 15 10 15Z" fill="#B2B8BF"/>
            <circle cx="10" cy="10" r="9" stroke="#B2B8BF" stroke-width="2"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
