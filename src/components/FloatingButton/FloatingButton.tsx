import { useChat } from '../../store/ChatContext';
import ChatPanel from '../Chat/ChatPanel';
import avatarImage from '../../assets/floating-button-avatar.png';
import styles from './FloatingButton.module.css';

const FloatingButton = () => {
  const { isOpen, openChat } = useChat();

  if (isOpen) {
    return (
      <div className={styles.expandedWrap}>
        <ChatPanel />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.floatingBtn}
      title="AI-помощник"
      aria-label="AI-помощник"
      onClick={openChat}
    >
      <span className={styles.label}>AI-помощник</span>
      <span className={styles.avatarWrap}>
        <img src={avatarImage} alt="" className={styles.avatar} aria-hidden />
      </span>
    </button>
  );
};

export default FloatingButton;
