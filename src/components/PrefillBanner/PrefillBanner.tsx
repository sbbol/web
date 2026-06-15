import styles from './PrefillBanner.module.css';

interface Props {
  visible: boolean;
}

const PrefillBanner = ({ visible }: Props) => {
  if (!visible) return null;
  return (
    <div className={styles.banner}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 5V9M8 11V11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      Поля заполнены Дейлом — проверьте данные перед отправкой
    </div>
  );
};

export default PrefillBanner;
