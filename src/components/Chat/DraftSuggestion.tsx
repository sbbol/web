import type { Draft } from '../../types/chat';
import styles from './DraftSuggestion.module.css';

interface Props {
  drafts: Draft[];
  onContinue: (draft: Draft) => void;
  onDismiss: (draft: Draft) => void;
}

const DraftSuggestion = ({ drafts, onContinue, onDismiss }: Props) => {
  if (!drafts.length) return null;

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Незавершённые действия:</p>
      {drafts.slice(0, 3).map(draft => (
        <div key={draft.id} className={styles.row}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => onContinue(draft)}
          >
            ↻ {draft.title}
          </button>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={() => onDismiss(draft)}
            aria-label="Удалить черновик"
            title="Удалить"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default DraftSuggestion;
