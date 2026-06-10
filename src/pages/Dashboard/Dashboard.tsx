import { useContext, useState } from 'react';
import { AppContext } from '../../store/AppContext';
import styles from './Dashboard.module.css';

// --- SVG-иконки (упрощённые) ---
const PhoneIcon = () => (<span>📞</span>);
const NotificationIcon = () => (<span>🔔</span>);
const EnvelopeIcon = () => (<span>✉️</span>);
const HelpIcon = () => (<span>❓</span>);

const Dashboard = () => {
  const { user, accounts: contextAccounts } = useContext(AppContext);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [balanceExpanded, setBalanceExpanded] = useState(false);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(true);
  const [statementExpanded, setStatementExpanded] = useState(true);

  const accounts = contextAccounts?.length > 0 ? contextAccounts : [
    { id: '1', currency: 'BYN', number: 'BY51 BPSB 3012 2222 2222 2933 2222', name: 'Текущий (расчетный) счет', remark: 'крутой', balance: '200.00', currencyCode: 'BYN' },
    { id: '2', currency: 'BYN', number: 'BY69 BPSB 3012 3333 3333 3933 3333', name: 'Карточный счет', remark: 'Добрый счёт', balance: '300.00', currencyCode: 'BYN' },
    { id: '3', currency: 'EUR', number: 'BY41 BPSB 3012 0000 0000 0978 0000', name: 'Текущий (расчетный) счет', remark: 'заметка', balance: '2 000.00', currencyCode: 'EUR' },
  ];

  const quickLinks = [
    { icon: 'doc', label: 'Документы на подписании', count: 0 },
    { icon: 'credits', label: 'Кредиты' },
    { icon: 'cards', label: 'Корпоративные карты' },
    { icon: 'counterparties', label: 'Контрагенты' },
    { icon: 'employees', label: 'Сотрудники' },
    { icon: 'rates', label: 'Курсы валют' },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Баннер */}
      {bannerVisible && (
        <div className={styles.banner}>
          <div className={styles.bannerInner}>
            <button className={styles.bannerClose} onClick={() => setBannerVisible(false)}>✕</button>
            <div className={styles.bannerText}>
              <div className={styles.bannerTitle}>Больше стран для проверки контрагента</div>
              <div className={styles.bannerSubtitle}>Сервис включен в пакеты услуг</div>
              <div className={styles.bannerBtns}>
                <button className={styles.btnPrimary}>Подробнее</button>
                <button className={styles.btnSecondary}>Создать запрос</button>
              </div>
            </div>
            <div className={styles.bannerImage}>
              {/* placeholder image */}
              <div style={{ width: 120, height: 80, background: '#ddd', borderRadius: 8 }} />
            </div>
          </div>
        </div>
      )}

      {/* Блок компании и остатков */}
      <div className={styles.companyBlock}>
        <div className={styles.companyRow}>
          <h1 className={styles.companyName}>{user?.name || 'DEMO ЮРИДИЧЕСКОЕ ЛИЦО'}</h1>
          <button className={styles.createDocBtn}>Создать документ</button>
        </div>
        <div className={styles.totalBalance}>
          <div className={styles.totalBalanceHeader} onClick={() => setBalanceExpanded(!balanceExpanded)}>
            <span>Всего доступно средств</span>
            <span className={styles.infoIcon}>?</span>
            <span className={styles.chevron}>{balanceExpanded ? '▲' : '▼'}</span>
          </div>
          {balanceExpanded && (
            <div className={styles.balanceDetails}>
              <div className={styles.balanceRow}>
                <div className={styles.balanceLabel}>На счетах в BYN</div>
                <div className={styles.balanceValue}>500.00 <small>BYN</small></div>
              </div>
              <div className={styles.balanceRow}>
                <div className={styles.balanceLabel}>На счетах в других валютах</div>
                <div className={styles.balanceValue}>
                  0.00 <small>USD</small> • 3 000.00 <small>RUB</small> • 2 000.00 <small>EUR</small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Список счетов */}
      <div className={styles.accountsBlock}>
        <div className={styles.accountsHeader}>
          <h3>Счета</h3>
          <div className={styles.accountsControls}>
            <select className={styles.filterSelect}>
              <option>Все валюты • Все счета</option>
            </select>
            <label className={styles.showHidden}>
              <input type="checkbox" /> Отображать скрытые
            </label>
            <button className={styles.refreshBtn}>🔄 Обновить остатки</button>
            <button className={styles.settingsBtn}>⚙️</button>
          </div>
        </div>
        <div className={styles.accountsList}>
          {accounts.map(acc => (
            <div key={acc.id} className={styles.accountItem}>
              <div className={styles.accountCurrency}>{acc.currency}</div>
              <div className={styles.accountInfo}>
                <div className={styles.accountNumber}>{acc.number}</div>
                <div className={styles.accountName}>{acc.name}</div>
                {acc.remark && <div className={styles.accountRemark}>{acc.remark}</div>}
              </div>
              <div className={styles.accountBalance}>
                <span className={styles.accountAmount}>{acc.balance}</span>
                <span className={styles.accountCurrencyCode}> {acc.currencyCode}</span>
              </div>
              <div className={styles.accountActions}>•••</div>
            </div>
          ))}
        </div>
      </div>

      {/* Быстрые ссылки */}
      <div className={styles.quickLinks}>
        {quickLinks.map(link => (
          <button key={link.label} className={styles.quickLinkItem}>
            <span className={styles.quickLinkIcon}>
              {link.icon === 'doc' ? '📄' : link.icon === 'credits' ? '💳' : link.icon === 'cards' ? '💳' : link.icon === 'counterparties' ? '👥' : link.icon === 'employees' ? '👤' : '💱'}
            </span>
            {link.count !== undefined && <span className={styles.quickLinkCount}>{link.count}</span>}
            <span className={styles.quickLinkLabel}>{link.label}</span>
          </button>
        ))}
      </div>

      {/* Динамика оборотов */}
      <div className={styles.collapsibleBlock}>
        <div className={styles.collapsibleHeader} onClick={() => setAnalyticsExpanded(!analyticsExpanded)}>
          <span className={styles.blockIcon}>📊</span>
          <span>Динамика оборотов по счетам, BYN</span>
          <span className={styles.infoIcon}>?</span>
          <span className={styles.chevron}>{analyticsExpanded ? '▲' : '▼'}</span>
        </div>
        {analyticsExpanded && (
          <div className={styles.collapsibleContent}>
            <div className={styles.chartPlaceholder}>
              {/* Здесь может быть график */}
              <span>График зачислений и списаний</span>
            </div>
            <div className={styles.chartLegend}>
              <span className={styles.legendDot} style={{ background: '#107F8C' }} /> Зачисления
              <span className={styles.legendDot} style={{ background: '#90D0CC' }} /> Списания
            </div>
            <div className={styles.detailsLink}>Подробнее</div>
          </div>
        )}
      </div>

      {/* Движение по счетам / Документы */}
      <div className={styles.collapsibleBlock}>
        <div className={styles.collapsibleHeader} onClick={() => setStatementExpanded(!statementExpanded)}>
          <span className={styles.blockIcon}>📋</span>
          <span>Движение по счетам / Документы</span>
          <span className={styles.chevron}>{statementExpanded ? '▲' : '▼'}</span>
        </div>
        {statementExpanded && (
          <div className={styles.collapsibleContent}>
            <p>Здесь будет таблица или ссылки на выписки.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;