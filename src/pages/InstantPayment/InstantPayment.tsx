import { useEffect } from 'react';
import DocumentFormLayout, { DocMetaSidebar, DocFormFooter } from '../../components/DocumentFormLayout';
import PrefillBanner from '../../components/PrefillBanner/PrefillBanner';
import { useDraftTracker } from '../../hooks/useDraftTracker';
import { useFormPrefill } from '../../hooks/useFormPrefill';
import styles from './InstantPayment.module.css';

interface Props {
  onClose?: () => void;
}

const InstantPayment = ({ onClose }: Props) => {
  const { fromDale, get, bind } = useFormPrefill('/instant-payment');
  const { trackField, saveNow, completeDraft } = useDraftTracker({
    draftType: 'instant_payment',
    title: 'Мгновенный платёж',
    route: '/instant-payment',
  });

  useEffect(() => {
    if (fromDale) {
      ['recipient', 'amount', 'purpose'].forEach(key => {
        const val = get(key);
        if (val) trackField(key, val);
      });
    }
  }, [fromDale, get, trackField]);

  const amountDefault = get('amount') || '0.00 BYN';

  return (
    <DocumentFormLayout
      title="МГНОВЕННЫЙ ПЛАТЕЖ (BYN)"
      onClose={onClose}
      sidebar={<DocMetaSidebar />}
      footer={<DocFormFooter onSaveDraft={() => saveNow()} onContinue={() => completeDraft()} />}
    >
      <div className={styles.form}>
        <PrefillBanner visible={fromDale} />

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Получатель</h3>
          <div className={styles.tabs}>
            <button type="button" className={`${styles.tab} ${styles.tabActive}`}>Из справочника</button>
            <button type="button" className={styles.tab}>Ввести вручную</button>
          </div>
          <div className={styles.inputWithIcon}>
            <input
              type="text"
              placeholder="Наименование контрагента или номер счета"
              {...bind('recipient')}
              onChange={e => {
                bind('recipient').onChange(e);
                trackField('recipient', e.target.value);
              }}
            />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 7H16M4 7L7 4M4 7L7 10" stroke="#B2B8BF" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Плательщик</h3>
          <label className={styles.field}>
            <span>Со счета</span>
            <select defaultValue="acc1" onChange={e => trackField('account', e.target.value)}>
              <option value="acc1">BY51 BPSB 3012 2222 2222 2933 2222</option>
            </select>
            <span className={styles.accountSub}>BYN • Текущий (расчетный) счет</span>
          </label>
          <div className={styles.orgRow}>
            <span>DEMO ЮРИДИЧЕСКОЕ ЛИЦО</span>
            <button type="button" className={styles.linkBtn}>Реквизиты</button>
          </div>
          <button type="button" className={styles.linkBtn}>+ Указать фактического плательщика ?</button>
          <label className={styles.field}>
            <span className={styles.fieldRow}>
              Сумма
              <button type="button" className={styles.linkBtnInline}>Указать НДС</button>
            </span>
            <input
              type="text"
              className={styles.amountInput}
              {...bind('amount', amountDefault)}
              onChange={e => {
                bind('amount', amountDefault).onChange(e);
                trackField('amount', e.target.value);
              }}
            />
          </label>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Назначение платежа</h3>
          <div className={styles.toggleGroup}>
            <button type="button" className={`${styles.toggle} ${styles.toggleActive}`}>Прямой платеж</button>
            <button type="button" className={styles.toggle}>Возврат платежа</button>
          </div>
          <label className={styles.field}>
            <span>Назначение платежа ?</span>
            <textarea
              rows={4}
              {...bind('purpose')}
              onChange={e => {
                bind('purpose').onChange(e);
                trackField('purpose', e.target.value);
              }}
            />
          </label>
          <button type="button" className={styles.linkBtn}>+ Указать документ-основание ?</button>
          <label className={styles.field}>
            <span>Категория назначения платежа</span>
            <select defaultValue="other"><option value="other">Иной платеж</option></select>
          </label>
          <label className={styles.field}>
            <span>Код назначения платежа</span>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                placeholder="Выберите код"
                onChange={e => trackField('payment_code', e.target.value)}
              />
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 7H16M4 7L7 4M4 7L7 10" stroke="#B2B8BF" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </label>
        </section>
      </div>
    </DocumentFormLayout>
  );
};

export default InstantPayment;
