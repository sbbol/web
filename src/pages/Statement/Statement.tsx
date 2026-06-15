import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDraftTracker } from '../../hooks/useDraftTracker';

import { useFormPrefill } from '../../hooks/useFormPrefill';

import PrefillBanner from '../../components/PrefillBanner/PrefillBanner';

import {

  fetchStatementReference,

  generateStatement,

  type StatementReference,

  type StatementResult,

} from '../../api/data';

import styles from './Statement.module.css';



const Statement = () => {
  const [searchParams] = useSearchParams();
  const { fromDale, get, setValues, clearFromDale } = useFormPrefill('/statement');

  const { trackField, completeDraft } = useDraftTracker({

    draftType: 'statement',

    title: 'Выписка по счёту',

    route: '/statement',

  });



  const [reference, setReference] = useState<StatementReference | null>(null);

  const [activeTab, setActiveTab] = useState(0);

  const [account, setAccount] = useState('all');

  const [period, setPeriod] = useState('today');

  const [zeroTurnover, setZeroTurnover] = useState(false);

  const [daily, setDaily] = useState(false);

  const [revaluation, setRevaluation] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<'account' | 'period' | null>(null);

  const [result, setResult] = useState<StatementResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');



  useEffect(() => {

    fetchStatementReference().then(setReference).catch(() => {});

  }, []);



  useEffect(() => {
    const accountParam = searchParams.get('account');
    if (accountParam) {
      setAccount(accountParam);
      trackField('account', accountParam);
    }
  }, [searchParams, trackField]);



  useEffect(() => {
    if (fromDale) {
      const p = get('period');
      let a = get('account');
      if (p) { setPeriod(p); trackField('period', p); }
      if (a) {
        if (reference && !reference.accountOptions.some(o => o.key === a)) {
          console.warn(`[Dale prefill] Account key "${a}" not found in options, falling back to "all"`);
          a = 'all';
        }
        setAccount(a);
        trackField('account', a);
      }
    }
  }, [fromDale, get, trackField, reference]);



  const accountLabel = reference?.accountOptions.find(o => o.key === account)?.label || 'Все валюты • Все счета';

  const periodLabel = reference?.periods.find(p => p.key === period)?.label || 'Сегодня';



  const handleReset = () => {
    setAccount('all');
    setPeriod('today');
    setZeroTurnover(false);
    setDaily(false);
    setRevaluation(false);
    setResult(null);
    setError('');
    setValues({});
    clearFromDale();
  };



  const handleGenerate = async () => {

    setLoading(true);

    setError('');

    trackField('period', period);

    trackField('account', account);

    trackField('zero_turnover', String(zeroTurnover));

    trackField('daily', String(daily));

    trackField('revaluation', String(revaluation));

    try {

      const data = await generateStatement({

        account,

        period,

        zero_turnover: zeroTurnover,

        daily,

        revaluation: revaluation,

      });

      setResult(data);
      await completeDraft();

    } catch {

      setError('Не удалось сформировать выписку');

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className={styles.page}>

      <h1 className={styles.title}>Выписка</h1>



      <div className={styles.card}>

        <PrefillBanner visible={fromDale} />



        <div className={styles.tabs}>

          {(reference?.tabs || ['ПО СЧЕТАМ']).map((tab, i) => (

            <button

              key={tab}

              type="button"

              className={`${styles.tab} ${i === activeTab ? styles.tabActive : ''}`}

              onClick={() => setActiveTab(i)}

            >

              {tab}

            </button>

          ))}

        </div>



        <div className={styles.filters}>

          <div className={styles.dropdownWrap}>

            <div

              className={styles.filterDropdown}

              role="button"

              tabIndex={0}

              onClick={() => setOpenDropdown(openDropdown === 'account' ? null : 'account')}

            >

              <span>{accountLabel}</span>

              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">

                <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />

              </svg>

            </div>

            {openDropdown === 'account' && (

              <div className={styles.dropdownMenu}>

                {reference?.accountOptions.map(opt => (

                  <button

                    key={opt.key}

                    type="button"

                    className={styles.dropdownItem}

                    onClick={() => {
                      setAccount(opt.key);
                      setOpenDropdown(null);
                      trackField('account', opt.key);
                      clearFromDale();
                    }}

                  >

                    {opt.label}

                  </button>

                ))}

              </div>

            )}

          </div>



          <div className={styles.dropdownWrap}>

            <div

              className={styles.filterDropdown}

              role="button"

              tabIndex={0}

              onClick={() => setOpenDropdown(openDropdown === 'period' ? null : 'period')}

            >

              <span>{periodLabel}</span>

              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">

                <path d="M4 6L8 10L12 6" stroke="#565B62" strokeWidth="1.5" strokeLinecap="round" />

              </svg>

            </div>

            {openDropdown === 'period' && (

              <div className={styles.dropdownMenu}>

                {reference?.periods.map(opt => (

                  <button

                    key={opt.key}

                    type="button"

                    className={styles.dropdownItem}

                    onClick={() => {
                      setPeriod(opt.key);
                      setOpenDropdown(null);
                      trackField('period', opt.key);
                      clearFromDale();
                    }}

                  >

                    {opt.label}

                  </button>

                ))}

              </div>

            )}

          </div>



          <button type="button" className={styles.resetLink} onClick={handleReset}>Сбросить фильтры</button>



          <div className={styles.checkboxes}>

            <label className={styles.checkbox}>

              <input

                type="checkbox"

                checked={zeroTurnover}

                onChange={e => {
                  setZeroTurnover(e.target.checked);
                  trackField('zero_turnover', String(e.target.checked));
                  clearFromDale();
                }}

              />

              Показывать нулевые обороты

            </label>

            <label className={styles.checkbox}>

              <input

                type="checkbox"

                checked={daily}

                onChange={e => {
                  setDaily(e.target.checked);
                  trackField('daily', String(e.target.checked));
                  clearFromDale();
                }}

              />

              Показывать выписку за каждый день

            </label>

            <label className={styles.checkbox}>

              <input

                type="checkbox"

                checked={revaluation}

                onChange={e => {
                  setRevaluation(e.target.checked);
                  trackField('revaluation', String(e.target.checked));
                  clearFromDale();
                }}

              />

              Показывать переоценку

            </label>

          </div>

        </div>



        <div className={styles.actions}>

          <button type="button" className={styles.submitBtn} onClick={handleGenerate} disabled={loading}>

            {loading ? 'Формирование…' : 'Сформировать выписку'}

          </button>

        </div>



        {error && <div className={styles.error}>{error}</div>}



        {result && (

          <div className={styles.result}>

            <div className={styles.resultHeader}>

              <h2>Выписка за {result.periodLabel}</h2>

              <span className={styles.resultMeta}>Операций: {result.transactionCount}</span>

            </div>

            <div className={styles.summary}>

              <div><span>Входящий остаток</span><strong>{result.openingBalance}</strong></div>

              <div><span>Оборот по дебету</span><strong>{result.turnoverDebit}</strong></div>

              <div><span>Оборот по кредиту</span><strong>{result.turnoverCredit}</strong></div>

              <div><span>Исходящий остаток</span><strong>{result.closingBalance}</strong></div>

            </div>

            {result.transactions.length > 0 ? (

              <table className={styles.table}>

                <thead>

                  <tr>

                    <th>Дата</th>

                    <th>Описание</th>

                    <th>Дебет</th>

                    <th>Кредит</th>

                    <th>Остаток</th>

                  </tr>

                </thead>

                <tbody>

                  {result.transactions.map((tx, i) => (

                    <tr key={i}>

                      <td>{tx.date}</td>

                      <td>{tx.description}{tx.accountName ? ` (${tx.accountName})` : ''}</td>

                      <td>{tx.debit}</td>

                      <td>{tx.credit}</td>

                      <td>{tx.balance}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            ) : (

              <p className={styles.empty}>За выбранный период операций не найдено</p>

            )}

          </div>

        )}

      </div>

    </div>

  );

};



export default Statement;

