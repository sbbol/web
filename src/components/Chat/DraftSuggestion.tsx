import type { Draft } from '../../types/chat';
import styles from './DraftSuggestion.module.css';

interface Props {
  drafts: Draft[];
  onContinue: (draft: Draft) => void;
}

const DraftSuggestion = ({ drafts, onContinue }: Props) => {
  if (!drafts.length) return null;

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Незавершённые действия:</p>
      {drafts.slice(0, 3).map(draft => (
        <button
          key={draft.id}
          type="button"
          className={styles.btn}
          onClick={() => onContinue(draft)}
        >
          ↻ {draft.title}
        </button>
      ))}
    </div>
  );
};

export default DraftSuggestion;
