import type { ChatMessage } from '../../types/chat';
import ActionButton from './ActionButton';
import avatarImage from '../../assets/floating-button-avatar.png';
import styles from './MessageBubble.module.css';

interface Props {
  message: ChatMessage;
}

const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === 'user';
  const isOperator = message.role === 'operator';

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : styles.rowAssistant}`}>
      {!isUser && (
        <img src={avatarImage} alt="" className={styles.avatar} aria-hidden />
      )}
      <div
        className={`${styles.bubble} ${isUser ? styles.user : isOperator ? styles.operator : styles.assistant}`}
      >
        <p className={styles.text}>
          {message.content}
          {message.isStreaming && <span className={styles.cursor}>▋</span>}
        </p>
        {message.actions?.map((action, i) => (
          <ActionButton key={i} action={action} />
        ))}
      </div>
    </div>
  );
};

export default MessageBubble;
