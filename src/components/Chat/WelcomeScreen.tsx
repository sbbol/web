import { useState } from 'react';
import { FEATURE_CARDS, POPULAR_QUERIES } from './chatConstants';
import logo from '../../assets/figma/chat/icon-ai-logo.png';
import iconQueryArrow from '../../assets/figma/chat/icon-query-arrow.png';
import iconClose from '../../assets/figma/icon-close.svg';
import styles from './WelcomeScreen.module.css';

interface Props {
  onQueryClick: (query: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

const WelcomeScreen = ({ onQueryClick, onClose, isLoading }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <img src={logo} alt="" className={styles.sparkles} aria-hidden />
        </div>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <img src={iconClose} alt="" width={36} height={36} aria-hidden />
        </button>
      </div>

      <p className={styles.intro}>
        Быстро найду нужные функции и помогу с задачами вашего бизнеса.
      </p>
      <p className={styles.queriesLabel}>
        Вот что я умею:
      </p>

      <div className={styles.cards}>
        {FEATURE_CARDS.map(card => {
          const isExpanded = expandedId === card.id;
          return (
            <div key={card.id} className={styles.cardWrap}>
              <button
                type="button"
                className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
                onClick={() => toggleCard(card.id)}
                aria-expanded={isExpanded}
              >
                <img src={card.icon} alt="" className={styles.cardIcon} aria-hidden />
                <div className={styles.cardText}>
                  <span className={styles.cardTitle}>{card.title}</span>
                  <span className={styles.cardSubtitle}>{card.subtitle}</span>
                </div>
              </button>
              <div className={`${styles.descriptionContainer} ${isExpanded ? styles.descriptionExpanded : ''}`}>
                <div className={styles.descriptionInner}>
                  <p className={styles.descriptionText}>{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.queries}>
        <p className={styles.queriesLabel}>Популярные запросы</p>
        <div className={styles.queryList}>
          {POPULAR_QUERIES.map(query => (
            <button
              key={query}
              type="button"
              className={styles.queryBtn}
              onClick={() => onQueryClick(query)}
              disabled={isLoading}
            >
              <img src={iconQueryArrow} alt="" className={styles.queryIcon} aria-hidden />
              <span>{query}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;