import { useTextSelection } from '../../hooks/useTextSelection';
import styles from './ExplainTooltip.module.css';

const ExplainTooltip = () => {
  const { selection, explanation, loading, dismiss } = useTextSelection();

  if (!selection) return null;

  return (
    <div
      className={styles.tooltip}
      data-explain-tooltip
      style={{ left: selection.x, top: selection.y }}
    >
      <button type="button" className={styles.close} onClick={dismiss} aria-label="Закрыть">×</button>
      <div className={styles.header}>
        <span className={styles.icon}>💡</span>
        <span className={styles.label}>Дэйл объясняет</span>
      </div>
      <p className={styles.quote}>«{selection.text.length > 80 ? selection.text.slice(0, 80) + '…' : selection.text}»</p>
      <p className={styles.text}>
        {loading ? 'Дэйл переводит на человеческий...' : explanation}
      </p>
    </div>
  );
};

export default ExplainTooltip;
