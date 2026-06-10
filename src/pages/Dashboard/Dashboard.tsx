import { useContext, useState } from 'react';
import { AppContext } from '../../store/AppContext';
import styles from './Dashboard.module.css';
import NewDocumentModal from '../../components/NewDocumentModal/NewDocumentModal';
import AccountDetailsModal from '../../components/AccountDetailsModal/AccountDetailsModal';

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, accounts: contextAccounts } = useContext(AppContext);

  const [bannerVisible, setBannerVisible] = useState(true);
  const [balanceExpanded, setBalanceExpanded] = useState(false);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);
  const [statementExpanded, setStatementExpanded] = useState(false);
  const [openedMenu, setOpenedMenu] =
  useState<string | null>(null);
  const [documentModalOpen, setDocumentModalOpen] =
  useState(false);
  const [detailsAccount, setDetailsAccount] =
  useState<Account | null>(null);

  const accounts =
    contextAccounts?.length > 0
      ? contextAccounts
      : [
          {
            id: '1',
            currency: 'BYN',
            number: 'BY51 BPSB 3012 2222 2222 2933 2222',
            name: 'Текущий (расчетный) счет',
            balance: '200.00',
            currencyCode: 'BYN',
          },
          {
            id: '2',
            currency: 'BYN',
            number: 'BY69 BPSB 3012 3333 3333 3933 3333',
            name: 'Карточный счет',
            balance: '300.00',
            currencyCode: 'BYN',
          },
          {
            id: '3',
            currency: 'EUR',
            number: 'BY41 BPSB 3012 0000 0000 0978 0000',
            name: 'Текущий (расчетный) счет',
            balance: '2 000.00',
            currencyCode: 'EUR',
          },
        ];

  const quickLinks = [
    {
      icon: '📄',
      label: 'Документы\nна подписании',
    },
    {
      icon: '%',
      label: 'Кредиты',
    },
    {
      icon: '💳',
      label: 'Корпоративные\nкарты',
    },
    {
      icon: '🏢',
      label: 'Контрагенты',
    },
    {
      icon: '👥',
      label: 'Сотрудники',
    },
    {
      icon: '⇄',
      label: 'Курсы\nвалют',
    },
  ];

  return (
    <div className={styles.dashboard}>
      {bannerVisible && (
        <div className={styles.banner}>
          <button
            className={styles.bannerClose}
            onClick={() => setBannerVisible(false)}
          >
            ✕
          </button>

          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <h2 className={styles.bannerTitle}>
                Больше стран для
                <br />
                проверки контрагента
              </h2>

              <div className={styles.bannerSubtitle}>
                Сервис включен в пакеты услуг
              </div>

              <div className={styles.bannerButtons}>
                <button className={styles.btnPrimary}>Подробнее</button>

                <button className={styles.btnSecondary}>
                  Создать запрос
                </button>
              </div>
            </div>

            <div className={styles.bannerImage} />
          </div>
        </div>
      )}

      <div className={styles.companySection}>
        <div className={styles.companyHeader}>
          <h1 className={styles.companyName}>
            {user?.name || 'DEMO ЮРИДИЧЕСКОЕ ЛИЦО'}
          </h1>

          <button
            className={styles.createDocBtn}
            onClick={() => setDocumentModalOpen(true)}
          >
            Создать документ
</button>
        </div>

        <div
          className={styles.totalBalanceHeader}
          onClick={() => setBalanceExpanded(!balanceExpanded)}
        >
          <span>Всего доступно средств</span>
          <span className={styles.infoIcon}>ⓘ</span>
          <span>⌄</span>
        </div>

        {balanceExpanded && (
          <div className={styles.balanceDetails}>
            <div className={styles.balanceRow}>
              <span>На счетах в BYN</span>
              <span>500.00 BYN</span>
            </div>

            <div className={styles.balanceRow}>
              <span>Другие валюты</span>
              <span>2 000.00 EUR</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.accountsBlock}>
        <div className={styles.accountsHeader}>
          <h3>Счета</h3>

          <div className={styles.accountsControls}>
            <select className={styles.filterSelect}>
              <option>Все валюты • Все счета</option>
            </select>

            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              Отображать скрытые
            </label>

            <button className={styles.linkBtn}>
              Обновить остатки
            </button>

            <button className={styles.settingsBtn}>⚙</button>
          </div>
        </div>

        {accounts.map((acc) => (
          <div key={acc.id} className={styles.accountItem}>
            <div className={styles.currencyCircle}>
              {acc.currency}
            </div>

            <div className={styles.accountInfo}>
              <div className={styles.accountNumber}>
                {acc.number}
              </div>

              <div className={styles.accountName}>
                {acc.name}
              </div>
            </div>

            <div className={styles.accountBalance}>
              {acc.balance} {acc.currencyCode}
            </div>

            <div className={styles.accountMenuWrapper}>
  <button
    className={styles.accountMenu}
    onClick={() =>
      setOpenedMenu(
        openedMenu === acc.id
          ? null
          : acc.id
      )
    }
  >
    ⋯
  </button>

  {openedMenu === acc.id && (
  <div className={styles.dropdown}>
    <button
      onClick={() =>
        navigate(
          `/account_info/${acc.id}`
        )
      }
    >
      Просмотреть
    </button>

    <button
      onClick={() => {
        setDetailsAccount(acc);
        setOpenedMenu(null);
      }}
    >
      Реквизиты счета
    </button>
  </div>
)}
</div>
          </div>
        ))}
      </div>

      <div className={styles.quickLinks}>
        {quickLinks.map((item) => (
          <button key={item.label} className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>
              {item.icon}
            </span>

            <span className={styles.quickLinkText}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.collapseBlock}>
        <div
          className={styles.collapseHeader}
          onClick={() => setAnalyticsExpanded(!analyticsExpanded)}
        >
          <div>
            📊 Динамика оборотов по счетам, BYN
          </div>

          <span>⌄</span>
        </div>

        {analyticsExpanded && (
          <div className={styles.placeholder}>
            График
          </div>
        )}
      </div>

      <div className={styles.collapseBlock}>
        <div
          className={styles.collapseHeader}
          onClick={() => setStatementExpanded(!statementExpanded)}
        >
          <div>📋 Движение по счетам / Документы</div>

          <span>⌄</span>
        </div>

        {statementExpanded && (
          <div className={styles.placeholder}>
            Выписки и документы
          </div>
        )}
      </div>
      {documentModalOpen && (
  <NewDocumentModal
  onClose={() =>
    setDocumentModalOpen(false)
  }
  onInstantPayment={() => {
    setDocumentModalOpen(false);
    navigate('/instant-payment');
  }}
  onPaymentOrder={() => {
    setDocumentModalOpen(false);
    navigate('/payment-order');
  }}
/>
)}

{detailsAccount && (
  <AccountDetailsModal
    account={detailsAccount}
    onClose={() =>
      setDetailsAccount(null)
    }
  />
)}
    </div>
  );
};

export default Dashboard;