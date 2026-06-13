import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.divider} />
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.copyright}>© ОАО «Сбер Банк», 2026</span>
        <a href="https://www.sber-bank.by" className={styles.link}>www.sber-bank.by</a>
      </div>
      <div className={styles.center}>
        <span className={styles.supportTitle}>Центр клиентской поддержки:</span>
        <div className={styles.phones}>
          <span>+375 17 359-99-11</span>
          <span>+375 33 348-99-11</span>
          <span>+375 29 359-99-11</span>
        </div>
      </div>
      <a
        href="https://www.sber-bank.by/page/protection-of-personal-data"
        className={styles.policy}
      >
        Политика обработки персональных данных
      </a>
    </div>
  </footer>
);

export default Footer;
