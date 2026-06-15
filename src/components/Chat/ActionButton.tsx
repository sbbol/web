import { useLocation, useNavigate } from 'react-router-dom';
import type { ChatAction } from '../../types/chat';
import { navigateWithPrefill } from '../../utils/deepLinks';
import styles from './ActionButton.module.css';

interface Props {
  action: ChatAction;
}

const ActionButton = ({ action }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (action.type === 'escalate') {
    return (
      <div className={styles.escalate}>
        Диалог передан сотруднику банка. Ответ появится в этом чате.
      </div>
    );
  }

  if (action.type === 'navigate' && action.label) {
    return (
      <button
        type="button"
        className={styles.btn}
        onClick={() => navigateWithPrefill(navigate, action, location.pathname)}
      >
        {action.label}
      </button>
    );
  }

  return null;
};

export default ActionButton;
