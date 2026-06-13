import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, type Account } from '../../store/AppContext';
import NewDocumentModal from '../../components/NewDocumentModal/NewDocumentModal';
import AccountDetailsModal from '../../components/AccountDetailsModal/AccountDetailsModal';
import styles from './Dashboard.module.css';

import bannerFull from '../../assets/figma/banner-full.png';
import iconClose from '../../assets/figma/icon-close.svg';
import iconDots from '../../assets/figma/icon-dots.svg';
import iconChart from '../../assets/figma/icon-chart.svg';
import iconDocuments from '../../assets/figma/icon-documents.svg';
import quickDocs from '../../assets/figma/quick-docs.svg';
import quickCredits from '../../assets/figma/quick-credits.svg';
import quickCards from '../../assets/figma/quick-cards.svg';
import quickCounterparties from '../../assets/figma/quick-counterparties.svg';
import quickEmployees from '../../assets/figma/quick-employees.svg';
import quickRates from '../../assets/figma/quick-rates.svg';

const quickLinks = [
  { icon: quickDocs, label: 'Документы на подписании' },
  { icon: quickCards, label: 'Корпоративные карты' },
  { icon: quickCounterparties, label: 'Контрагенты' },
  { icon: quickEmployees, label: 'Сотрудники' },
  { icon: quickRates, label: 'Курсы валют' },
  { icon: quickCredits, label: 'Кредиты' },
];

const CurrencyBadge = ({ code }: { code: string }) => (
  <div className={styles.currencyBadge}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="19" stroke="#B2B8BF" strokeWidth="2" />
    </svg>
    <span className={styles.currencyCode}>{code}</span>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, accounts } = useContext(AppContext);

  const [bannerVisible, setBannerVisible] = useState(true);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);
  const [statementExpanded, setStatementExpanded] = useState(false);
  const [openedMenu, setOpenedMenu] = useState<string | null>(null);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [detailsAccount, setDetailsAccount] = useState<Account | null>(null);

  return (
    <div className={styles.dashboard}>
      {bannerVisible && (
        <div className={styles.banner}>
          <img src={bannerFull} alt="" className={styles.bannerImage} />
          <button
            type="button"
            className={styles.bannerClose}
            onClick={() => setBannerVisible(false)}
            aria-label="Закрыть"
          >
            <img src={iconClose} alt="" width={24} height={24} />
          </button>
        </div>
      )}

      <section className={styles.customerInfo}>
        <div className={styles.customerRow}>
          <h1 className={styles.customerName}>{user?.name || 'DEMO ЮРИДИЧЕСКОЕ ЛИЦО'}</h1>
          <button
            type="button"
            className={styles.createDocBtn}
            onClick={() => setDocumentModalOpen(true)}
          >
            Создать документ
          </button>
        </div>

        <div className={styles.balanceRow}>
          <div className={styles.balanceBlock}>
            <div className={styles.balanceLabel}>ВСЕГО ДОСТУПНО НА BYN СЧЕТАХ</div>
            <div className={styles.balanceAmount}>
              <span className={styles.amountValue}>32 405,00</span>
              <span className={styles.amountCurrency}> BYN</span>
            </div>
          </div>
          <div className={styles.balanceBlockWide}>
            <div className={styles.balanceLabelRow}>
              <span className={styles.balanceLabel}>НА СЧЕТАХ В ДРУГИХ ВАЛЮТАХ</span>
            </div>
            <div className={styles.foreignAmounts}>
              <span><span className={styles.amountValue}>1 188 123,00</span><span className={styles.amountCurrency}> RUB</span></span>
              <span><span className={styles.amountValue}>1 500 000 000,00</span><span className={styles.amountCurrency}> EUR</span></span>
              <span><span className={styles.amountValue}>2 531,21</span><span className={styles.amountCurrency}> UAH</span></span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.middleRow}>
        <div className={styles.accountsCard}>
          <div className={styles.accountsHeader}>
            <h2 className={styles.accountsTitle}>Счета</h2>
            <div className={styles.accountsControls}>
              <div className={styles.filterInput}>
                <span>Все валюты • Все счета</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 10L12 15L17 10" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <label className={styles.checkboxLabel}>
                <span className={styles.checkboxActive}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="#107F8C" />
                    <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Отображать скрытые
              </label>
              <button type="button" className={styles.refreshBtn}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 10C2 5.58172 5.58172 2 10 2C12.5255 2 14.7781 3.16952 16.2455 5H13.5C12.9477 5 12.5 5.44772 12.5 6C12.5 6.55228 12.9477 7 13.5 7H18.5C19.0523 7 19.5 6.55228 19.5 6V1C19.5 0.447715 19.0523 0 18.5 0C17.9477 0 17.5 0.447715 17.5 1V3.38555C15.6687 1.31073 12.9876 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 9.44771 19.5523 9 19 9C18.4477 9 18 9.44771 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="#B2B8BF"/>
                </svg>
                Обновить остатки
              </button>
              <button type="button" className={styles.settingsBtn} aria-label="Настройки">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6ZM8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10Z" fill="#B2B8BF"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.39557 0C7.96905 0 7.58947 0.270531 7.4503 0.67371L6.85272 2.40493L6.85213 2.40648L6.85045 2.40734L6.84865 2.40792L6.84714 2.40724L5.2035 1.60713C4.82 1.42045 4.36031 1.49756 4.05871 1.79916L1.79928 4.05858C1.49769 4.36018 1.42058 4.81987 1.60726 5.20337L2.40736 6.84701L2.40805 6.84853L2.40746 6.85032L2.40661 6.852L2.40505 6.85259L0.673709 7.45022C0.270531 7.58939 0 7.96897 0 8.39549V11.5885C0 12.015 0.270531 12.3946 0.673709 12.5338L2.40505 13.1314L2.40661 13.132L2.40746 13.1336L2.40804 13.1354L2.40736 13.137L1.60201 14.7914C1.41533 15.1749 1.49244 15.6346 1.79403 15.9362L4.04793 18.1901C4.34952 18.4917 4.80922 18.5688 5.19272 18.3821L6.84714 17.5767L6.84867 17.576L6.85045 17.5766L6.85212 17.5775L6.85272 17.579L7.45583 19.3263C7.595 19.7295 7.97458 20 8.4011 20H11.5831C12.0096 20 12.3892 19.7295 12.5284 19.3263L13.1315 17.579L13.1321 17.5775L13.1338 17.5766L13.1356 17.5761L13.1371 17.5767L14.8021 18.3872C15.1856 18.5739 15.6453 18.4968 15.9469 18.1952L18.1954 15.9468C18.497 15.6452 18.5741 15.1855 18.3874 14.802L17.5769 13.137L17.5762 13.1354L17.5768 13.1336L17.5776 13.132L17.5792 13.1314L19.3263 12.5283C19.7295 12.3891 20 12.0096 20 11.583V8.40093C20 7.97441 19.7295 7.59483 19.3263 7.45566L17.5792 6.85259L17.5776 6.852L17.5768 6.85032L17.5762 6.84853L17.5769 6.84701L18.3821 5.19276C18.5688 4.80926 18.4917 4.34957 18.1901 4.04797L15.9361 1.79399C15.6345 1.49239 15.1748 1.41529 14.7913 1.60197L13.1371 2.40724L13.1356 2.40792L13.1338 2.40734L13.1321 2.40648L13.1315 2.40493L12.5339 0.67371C12.3948 0.270531 12.0152 0 11.5887 0H8.39557ZM8.74325 3.05751L9.10829 2H10.8759L11.241 3.05751C11.6333 4.19414 12.9313 4.73178 14.0125 4.20549L15.0259 3.71217L16.2719 4.95822L15.7786 5.97164C15.2523 7.05279 15.79 8.35078 16.9266 8.74313L18 9.11365V10.8703L16.9266 11.2408C15.79 11.6332 15.2523 12.9312 15.7786 14.0123L16.2772 15.0365L15.0367 16.277L14.0125 15.7785C12.9313 15.2522 11.6333 15.7898 11.241 16.9265L10.8704 18H9.11382L8.74325 16.9265C8.35091 15.7898 7.05292 15.2522 5.97177 15.7785L4.95817 16.2719L3.71221 15.0259L4.20562 14.0123C4.73191 12.9312 4.19426 11.6332 3.05763 11.2408L2 10.8758V9.1082L3.05763 8.74313C4.19426 8.35078 4.73191 7.05279 4.20562 5.97164L3.71746 4.96883L4.96896 3.71734L5.97177 4.20549C7.05292 4.73178 8.35091 4.19414 8.74325 3.05751Z" fill="#B2B8BF"/>
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.accountsList}>
            {accounts.map(acc => (
              <div key={acc.id} className={styles.accountRow}>
                <CurrencyBadge code={acc.currencyCode} />
                <div className={styles.accountInfo}>
                  <div className={styles.accountNumber}>{acc.number}</div>
                  <div className={styles.accountMeta}>
                    {acc.name}
                    {acc.description && (
                      <>
                        <br />
                        {acc.description}
                      </>
                    )}
                  </div>
                  {acc.hidden && (
                    <span className={styles.hiddenIcon} title="Скрытый счет"/>
                  )}
                </div>
                <div className={styles.accountBalance}>
                  {acc.noInfo ? (
                    <span className={styles.noInfo}>
                      Нет информации
                    </span>
                  ) : (
                    <>
                      <span className={styles.amountValue}>{acc.balance}</span>
                      <span className={styles.amountCurrency}> {acc.currencyCode}</span>
                    </>
                  )}
                </div>
                <div className={styles.accountMenuWrap}>
                  <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={() => setOpenedMenu(openedMenu === acc.id ? null : acc.id)}
                    aria-label="Меню"
                  >
                    <img src={iconDots} alt="" width={20} height={20} />
                  </button>
                  {openedMenu === acc.id && (
                    <div className={styles.dropdown}>
                      <button type="button" onClick={() => navigate(`/account_info/${acc.id}`)}>
                        Просмотреть
                      </button>
                      <button type="button">Выписка</button>
                      <button
                        type="button"
                        onClick={() => {
                          setDetailsAccount(acc);
                          setOpenedMenu(null);
                        }}
                      >
                        Показать счет
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.quickLinks}>
          {quickLinks.map(link => (
            <button key={link.label} type="button" className={styles.quickLink}>
              <img src={link.icon} alt="" width={40} height={40} className={styles.quickLinkIcon} />
              <span className={styles.quickLinkLabel}>{link.label}</span>
            </button>
          ))}
        </aside>
      </div>

      <section className={styles.collapsible}>
        <button
          type="button"
          className={styles.collapsibleHeader}
          onClick={() => setAnalyticsExpanded(v => !v)}
        >
          <img src={iconChart} alt="" width={56} height={36} className={styles.sectionIcon} />
          <span>Динамика оборотов по счетам, BYN</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.chevron}>
            <path d="M7 10L12 15L17 10" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {analyticsExpanded && <div className={styles.collapsibleBody}>График зачислений и списаний</div>}
      </section>

      <section className={styles.collapsible}>
        <button
          type="button"
          className={styles.collapsibleHeader}
          onClick={() => setStatementExpanded(v => !v)}
        >
          <img src={iconDocuments} alt="" width={56} height={36} className={styles.sectionIcon} />
          <span>Движение по счетам / Документы</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.chevron}>
            <path d="M7 10L12 15L17 10" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {statementExpanded && <div className={styles.collapsibleBody}>Выписки и документы</div>}
      </section>

      {documentModalOpen && (
        <NewDocumentModal
          onClose={() => setDocumentModalOpen(false)}
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
          onClose={() => setDetailsAccount(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
