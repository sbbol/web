import styles from './FloatingButton.module.css';

const FloatingButton = () => (
  <button type="button" className={styles.floatingBtn} title="Чат с банком" aria-label="Чат с банком">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 4C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H7.1C6.7 17.05 6.05 18.15 5.1 19.05C4.92 19.22 5.08 19.6 5.32 19.53C7.4 18.85 9.5 17.95 10.9 16.5H18C19.1046 16.5 20 15.6046 20 14.5V6C20 4.89543 19.1046 4 18 4H6Z"
        fill="white"
      />
    </svg>
  </button>
);

export default FloatingButton;
