import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <span>© ОАО «Сбер Банк», 2026</span>
          <a href="https://www.sber-bank.by" target="_blank" rel="noopener noreferrer" className={styles.link}>
            www.sber-bank.by
          </a>
        </div>
        <div className={styles.support}>
          <span className={styles.supportLabel}>Центр клиентской поддержки:</span>
          <div className={styles.phones}>
            <span>+375 17 359-99-11</span>
            <span>+375 29 359-99-11</span>
            <span>+375 33 348-99-11</span>
          </div>
        </div>
        <div className={styles.policy}>
          <a href="https://www.sber-bank.by/page/protection-of-personal-data" target="_blank" rel="noopener noreferrer">
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;