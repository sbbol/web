import { type FormEvent } from 'react';
import iconMicrophone from '../../assets/figma/chat/icon-microphone.svg';
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
          aria-label={isLoading ? 'Остановить' : value.trim() ? 'Отправить' : 'Голосовой ввод'}
          disabled={disabled && !isLoading}
        >
          {isLoading ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <rect x="2" y="2" width="10" height="10" rx="1" fill="white" />
            </svg>
          ) : (
            <img src={iconMicrophone} alt="" width={20} height={20} aria-hidden />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
