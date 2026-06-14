import type { ChatMessage } from '../../types/chat';
import ActionButton from './ActionButton';
import styles from './MessageBubble.module.css';

interface Props {
  message: ChatMessage;
}

const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === 'user';
  const isOperator = message.role === 'operator';

  return (
    <div className={`${styles.bubble} ${isUser ? styles.user : isOperator ? styles.operator : styles.assistant}`}>
      {!isUser && (
        <span className={styles.name}>{isOperator ? 'Оператор банка' : 'Дэйл'}</span>
      )}
      <p className={styles.text}>
        {message.content}
        {message.isStreaming && <span className={styles.cursor}>▋</span>}
      </p>
      {message.actions?.map((action, i) => (
        <ActionButton key={i} action={action} />
      ))}
    </div>
  );
};

export default MessageBubble;
