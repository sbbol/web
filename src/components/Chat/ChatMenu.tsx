import { useEffect, useRef } from 'react';
import iconHeadset from '../../assets/figma/chat/icon-headset.svg';
import iconTrash from '../../assets/figma/chat/icon-trash.svg';
import styles from './ChatMenu.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onContactSupport: () => void;
  onClearChat: () => void;
}

const ChatMenu = ({ isOpen, onClose, onContactSupport, onClearChat }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.menu} ref={menuRef}>
      <button type="button" className={styles.menuItem} onClick={onContactSupport}>
        <img src={iconHeadset} alt="" className={styles.menuIcon} aria-hidden />
        <span>Связаться с поддержкой</span>
      </button>
      <div className={styles.separator} />
      <button type="button" className={styles.menuItem} onClick={onClearChat}>
        <img src={iconTrash} alt="" className={styles.menuIcon} aria-hidden />
        <span>Очистить чат</span>
      </button>
    </div>
  );
};

export default ChatMenu;
