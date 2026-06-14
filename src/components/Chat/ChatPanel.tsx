import { useRef, useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../store/ChatContext';
import MessageBubble from './MessageBubble';
import DraftSuggestion from './DraftSuggestion';
import { navigateWithPrefill } from '../../utils/deepLinks';
import type { Draft } from '../../types/chat';
import styles from './ChatPanel.module.css';
const SUGGESTED_TOPICS = [
  'Как создать платёж?',
  'Как получить выписку?',
  'Как добавить сотрудника?',
];

const ChatPanel = () => {
  const {
    messages,
    isLoading,
    statusText,
    drafts,
    sendMessage,
    stopGeneration,
    setIsOpen,
  } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, statusText]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleDraftContinue = (draft: Draft) => {
    setIsOpen(false);
    navigateWithPrefill(navigate, {
      type: 'navigate',
      route: draft.route,
      label: draft.title,
      params: { prefill: 'true' },
      form_data: draft.form_data || {},
    });
  };

  const hasMessages = messages.length > 0;

  return (
    <div className={styles.panel}>
      <button type="button" className={styles.close} onClick={() => setIsOpen(false)} aria-label="Закрыть">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 5L15 15M15 5L5 15" stroke="#B2B8BF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className={styles.header}>
        <div className={styles.avatar}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#107F8C" />
            <path d="M14 32C14 27.5817 17.5817 24 22 24H26C30.4183 24 34 27.5817 34 32V34H14V32Z" fill="white" />
            <circle cx="24" cy="18" r="6" fill="white" />
          </svg>
        </div>
        <div>
          <h3 className={styles.title}>Дэйл</h3>
          <p className={styles.subtitle}>AI-помощник СберБизнес</p>
        </div>
      </div>

      <div className={styles.messages}>
        {!hasMessages && (
          <>
            <p className={styles.greeting}>
              Здравствуйте! Я Дэйл — ваш помощник в СберБизнес. Задайте вопрос или выберите тему.
            </p>
            <DraftSuggestion drafts={drafts} onContinue={handleDraftContinue} />
            <div className={styles.topics}>
              {SUGGESTED_TOPICS.map(topic => (
                <button
                  key={topic}
                  type="button"
                  className={styles.topicBtn}
                  onClick={() => sendMessage(topic)}
                  disabled={isLoading}
                >
                  {topic}
                </button>
              ))}
            </div>
          </>
        )}

        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && statusText && (
          <div className={styles.status}>{statusText}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
        />
        {isLoading ? (
          <button
            type="button"
            className={styles.stopBtn}
            onClick={stopGeneration}
            aria-label="Остановить генерацию"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2" width="10" height="10" rx="1" fill="white" />
            </svg>
          </button>
        ) : (
          <button type="submit" className={styles.sendBtn} disabled={!input.trim()} aria-label="Отправить">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default ChatPanel;
