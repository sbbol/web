import { type FormEvent } from 'react';
import iconMicrophone from '../../assets/figma/chat/icon-microphone.svg';
import iconArrow from '../../assets/figma/chat/icon-arrow.svg'; // 👈 новый импорт
import styles from './ChatInput.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  onStop?: () => void;
  placeholder?: string;
  variant?: 'welcome' | 'chat';
}

const ChatInput = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isLoading = false,
  onStop,
  placeholder = 'Спросите или скажите, что нужно сделать...',
  variant = 'welcome',
}: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) {
      onStop?.();
      return;
    }
    if (!value.trim()) return;
    onSubmit();
  };

  // Определяем, есть ли текст
  const hasText = value.trim().length > 0;

  // Иконка зависит от состояний: загрузка → стоп, есть текст → стрелка, иначе микрофон
  const icon = isLoading ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="2" y="2" width="10" height="10" rx="1" fill="white" />
    </svg>
  ) : (
    <img
      src={hasText ? iconArrow : iconMicrophone}
      alt=""
      width={20}
      height={20}
      aria-hidden
    />
  );

  return (
    <form
      className={`${styles.form} ${variant === 'chat' ? styles.formChat : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputWrap}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled && !isLoading}
        />
        <button
          type="submit"
          className={styles.micBtn}
          aria-label={
            isLoading
              ? 'Остановить'
              : hasText
              ? 'Отправить'
              : 'Голосовой ввод'
          }
          disabled={disabled && !isLoading}
        >
          {icon}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;