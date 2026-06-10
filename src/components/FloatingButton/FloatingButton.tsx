import styles from './FloatingButton.module.css';

const FloatingButton = () => {
  return (
    <div className={styles.floatingBtn} title="Чат с банком">
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" fill="#107F8C" />
        <path fillRule="evenodd" clipRule="evenodd"
          d="M15 15C13.3431 15 12 16.3431 12 18V29C12 30.6569 13.3431 32 15 32H16.5506C16.0541 33.15 15.2597 34.3652 14.0415 35.5402C13.8097 35.7637 14.0733 36.2406 14.3778 36.136C17.1721 35.1763 20.7275 33.882 22.5869 32H36C37.6569 32 39 30.6569 39 29V18C39 16.3431 37.6569 15 36 15H15Z"
          fill="white" />
        <circle cx="19.5" cy="23.5" r="1.5" fill="#107F8C" />
        <circle opacity="0.7" cx="25.5" cy="23.5" r="1.5" fill="#107F8C" />
        <circle opacity="0.5" cx="31.5" cy="23.5" r="1.5" fill="#107F8C" />
      </svg>
    </div>
  );
};

export default FloatingButton;