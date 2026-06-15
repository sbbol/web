import { useState, useEffect } from 'react';
import { useTextSelection } from '../../hooks/useTextSelection';
import { useChat } from '../../store/ChatContext';
import styles from './ExplainTooltip.module.css';

const ExplainTooltip = () => {
  const { selection, explanation, loading, dismiss } = useTextSelection();
  const { sendMessage, setIsOpen } = useChat();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Сбрасываем видимость тултипа при изменении/снятии выделения
  useEffect(() => {
    setIsTooltipVisible(false);
  }, [selection]);

  if (!selection) return null;

  const handleAskDale = () => {
    const text = `Объясни: «${selection.text}»`;
    setIsOpen(true);
    void sendMessage(text);
  };

  // Мини-кнопка, пока тултип не открыт
  if (!isTooltipVisible) {
    return (
      <div
        className={styles.miniButton}
        style={{ left: selection.x, top: selection.y }}
        data-explain-tooltip
      >
        <button
          type="button"
          className={styles.miniAskBtn}
          onClick={() => setIsTooltipVisible(true)}
          aria-label="Объяснить выделенный текст"
        >
          💡
        </button>
        <button
          type="button"
          className={styles.miniClose}
          onClick={dismiss}
          aria-label="Закрыть"
        >
          ×
        </button>
      </div>
    );
  }

  // Полный тултип после нажатия мини-кнопки
  return (
    <div
      className={styles.tooltip}
      data-explain-tooltip
      style={{ left: selection.x, top: selection.y }}
    >
      <button type="button" className={styles.close} onClick={dismiss} aria-label="Закрыть">
        ×
      </button>
      <div className={styles.header}>
        <span className={styles.icon}>💡</span>
        <span className={styles.label}>Дейл объясняет</span>
      </div>
      <p className={styles.quote}>
        «{selection.text.length > 80 ? selection.text.slice(0, 80) + '…' : selection.text}»
      </p>
      <p className={styles.text}>
        {loading ? 'Дейл переводит на человеческий...' : explanation}
      </p>
    </div>
  );
};

export default ExplainTooltip;