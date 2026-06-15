import { useRef, useEffect, useState } from 'react';
import { useChat } from '../../store/ChatContext';
import MessageBubble from './MessageBubble';
import WelcomeScreen from './WelcomeScreen';
import ChatMenu from './ChatMenu';
import ChatInput from './ChatInput';
import { QUICK_ACTIONS } from './chatConstants';
import avatarImage from '../../assets/floating-button-avatar.png';
import iconClose from '../../assets/figma/icon-close.svg';
import iconMenuVertical from '../../assets/figma/chat/icon-menu-vertical.svg';
import styles from './ChatPanel.module.css';

const OPERATOR_PANEL_URL = 'http://localhost:8000/operator.html';

const ChatPanel = () => {
  const {
    messages,
    isLoading,
    statusText,
    drafts,
    isEscalated,
    sendMessage,
    stopGeneration,
    setIsOpen,
    startNewConversation,
  } = useChat();
  const [input, setInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, statusText]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleQueryClick = (query: string) => {
    sendMessage(query);
  };

  const handleContactSupport = () => {
    setMenuOpen(false);
    sendMessage('Связаться с поддержкой');
  };

  const handleClearChat = () => {
    setMenuOpen(false);
    startNewConversation();
    setInput('');
  };

  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  const inputPlaceholder = isEscalated
    ? 'Сообщение оператору…'
    : hasMessages
      ? 'Спросите или скажите, что сделать...'
      : 'Спросите или скажите, что нужно сделать...';

  return (
    <div className={styles.panel} data-chat-panel>
      {hasMessages ? (
        <>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderControls}>
              <button
                type="button"
                className={styles.menuBtn}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Меню"
                aria-expanded={menuOpen}
              >
                <img src={iconMenuVertical} alt="" width={20} height={20} aria-hidden />
              </button>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть"
              >
                <img src={iconClose} alt="" width={36} height={36} aria-hidden />
              </button>
            </div>
            <ChatMenu
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
              onContactSupport={handleContactSupport}
              onClearChat={handleClearChat}
            />
            <div className={styles.badge}>
              <img src={avatarImage} alt="" className={styles.badgeAvatar} aria-hidden />
              <span className={styles.badgeText}>AI-помощник</span>
            </div>
            <div className={styles.dateSep}>
              <span className={styles.dateLine} />
              <span className={styles.dateText}>Сегодня</span>
              <span className={styles.dateLine} />
            </div>
          </div>

          {isEscalated && (
            <div className={styles.escalationBanner}>
              Диалог передан оператору — ожидайте ответа.
              <a href={OPERATOR_PANEL_URL} target="_blank" rel="noopener noreferrer" className={styles.operatorLink}>
                Панель оператора
              </a>
            </div>
          )}

          <div className={styles.messages}>
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {isLoading && statusText && (
              <div className={styles.status}>{statusText}</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.footer}>
            <div className={styles.quickActions}>
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action.id}
                  type="button"
                  className={styles.quickBtn}
                  onClick={() => handleQuickAction(action.query)}
                  disabled={isLoading}
                >
                  {action.label}
                  {action.id === 'drafts' && drafts.length > 0 && (
                    <span className={styles.quickBadge}>{drafts.length}</span>
                  )}
                </button>
              ))}
            </div>
            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              disabled={isLoading}
              isLoading={isLoading}
              onStop={stopGeneration}
              placeholder={inputPlaceholder}
              variant="chat"
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.welcomeScroll}>
            <WelcomeScreen
              onQueryClick={handleQueryClick}
              onClose={() => setIsOpen(false)}
              isLoading={isLoading}
            />
          </div>
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            disabled={isLoading}
            isLoading={isLoading}
            onStop={stopGeneration}
            placeholder={inputPlaceholder}
            variant="welcome"
          />
        </>
      )}
    </div>
  );
};

export default ChatPanel;
