import { useState } from 'react';
import styles from './FloatingButton.module.css';

const FloatingButton = () => {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className={styles.expandedWrap}>
        <div className={styles.expandedPanel}>
          <button type="button" className={styles.expandedClose} onClick={() => setExpanded(false)} aria-label="Закрыть">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="#B2B8BF" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.expandedContent}>
            <div className={styles.expandedAvatar}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#107F8C" />
                <path d="M14 32C14 27.5817 17.5817 24 22 24H26C30.4183 24 34 27.5817 34 32V34H14V32Z" fill="white" />
                <circle cx="24" cy="18" r="6" fill="white" />
              </svg>
            </div>
            <h3 className={styles.expandedTitle}>Здравствуйте!</h3>
            <p className={styles.expandedText}>
              Я виртуальный ассистент Сбер Бизнес. Задайте мне вопрос или выберите тему из списка.
            </p>
            <div className={styles.expandedTopics}>
              {['Как создать платёж?', 'Как получить выписку?', 'Как подключить услугу?'].map(topic => (
                <button key={topic} type="button" className={styles.topicBtn}>
                  {topic}
                </button>
              ))}
            </div>
            <div className={styles.expandedInput}>
              <input type="text" placeholder="Введите сообщение..." />
              <button type="button" className={styles.sendBtn} aria-label="Отправить">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.floatingBtn}
      title="Чат с банком"
      aria-label="Чат с банком"
      onClick={() => setExpanded(true)}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
        <circle cx="28" cy="28" r="28" fill="#107F8C" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 16C16.8954 16 16 16.8954 16 18V28C16 29.1046 16.8954 30 18 30H20.2C19.6 31.4 18.7 32.8 17.4 34C17.15 34.25 17.35 34.75 17.7 34.65C20.5 33.75 23.4 32.5 25.2 30.5H38C39.1046 30.5 40 29.6046 40 28.5V18C40 16.8954 39.1046 16 38 16H18Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default FloatingButton;
