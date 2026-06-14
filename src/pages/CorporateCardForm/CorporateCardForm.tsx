import { useEffect, useState } from 'react';
import DocumentFormLayout, { DocFormFooter } from '../../components/DocumentFormLayout';
import PrefillBanner from '../../components/PrefillBanner/PrefillBanner';
import { useDraftTracker } from '../../hooks/useDraftTracker';
import { useFormPrefill } from '../../hooks/useFormPrefill';
import styles from './CorporateCardForm.module.css';

const steps = ['Карта', 'Держатель', 'Подтверждения', 'Контакты', 'Итоговый'];

const CorporateCardForm = () => {
  const { fromDale, get } = useFormPrefill('/products/corporate-card-form');
  const { trackField, saveNow, completeDraft } = useDraftTracker({
    draftType: 'corporate_card_form',
    title: 'Заявление на корпоративную карту',
    route: '/products/corporate-card-form',
  });

  const [account, setAccount] = useState('');
  const [contractNumber, setContractNumber] = useState('');
  const [orgName, setOrgName] = useState('DEMO IURIDICHESKOE LITCO');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (fromDale) {
      const org = get('orgName');
      const ph = get('phone');
      const acc = get('account');
      const contract = get('contractNumber');
      if (org) { setOrgName(org); trackField('orgName', org); }
      if (ph) { setPhone(ph); trackField('phone', ph); }
      if (acc) { setAccount(acc); trackField('account', acc); }
      if (contract) { setContractNumber(contract); trackField('contractNumber', contract); }
    }
  }, [fromDale, get, trackField]);

  const handleField = (name: string, value: string) => {
    trackField(name, value);
  };

  return (
    <DocumentFormLayout
      title="ЗАЯВЛЕНИЕ НА ПОЛУЧЕНИЕ КОРПОРАТИВНОЙ КАРТЫ"
      sidebar={
        <div className={styles.metaBox}>
          <label className={styles.metaField}>
            <span>№ документа</span>
            <input type="text" defaultValue="144" readOnly />
          </label>
          <label className={styles.metaField}>
            <span>Дата документа</span>
            <input type="text" defaultValue="13.06.2026" readOnly className={styles.readonly} />
          </label>
        </div>
      }
      footer={<DocFormFooter primaryLabel="Продолжить" onSaveDraft={() => saveNow()} onContinue={() => completeDraft()} />}
    >
      <div className={styles.stepper}>
        {steps.map((step, i) => (
          <div key={step} className={styles.stepWrap}>
            <div className={`${styles.step} ${i === 0 ? styles.stepActive : ''}`}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span className={styles.stepLabel}>{step}</span>
            </div>
            {i < steps.length - 1 && <div className={styles.stepLine} />}
          </div>
        ))}
      </div>

      <div className={styles.form}>
        <PrefillBanner visible={fromDale} />

        <label className={styles.field}>
          <span>Счет, к которому выпускается корпоративная карта</span>
          <select value={account} onChange={e => { setAccount(e.target.value); handleField('account', e.target.value); }}>
            <option value="" disabled>Выберите счет</option>
          </select>
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Корпоративную карту выпустить</legend>
          <label className={styles.radio}><input type="radio" name="contract" /> К новому счетному контракту</label>
          <label className={styles.radio}><input type="radio" name="contract" defaultChecked /> К счетному контракту №</label>
        </fieldset>

        <label className={styles.field}>
          <span>Счетной контракт</span>
          <input
            type="text"
            placeholder="Укажите номер счетного контракта"
            value={contractNumber}
            onChange={e => { setContractNumber(e.target.value); handleField('contractNumber', e.target.value); }}
          />
        </label>

        <label className={styles.field}>
          <span>Наименование организации латиницей (для указания на карте)</span>
          <input
            type="text"
            value={orgName}
            onChange={e => { setOrgName(e.target.value); handleField('orgName', e.target.value); }}
            className={styles.inputError}
          />
          <div className={styles.errorMsg}>Ошибка количества символов. Необходимое количество - от 1 до 20</div>
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Способ получения ПИН-кода</legend>
          <label className={styles.radio}><input type="radio" name="pin" defaultChecked /> самостоятельное установление (Е-ПИН)</label>
          <label className={styles.radio}><input type="radio" name="pin" /> в ПИН-конверте</label>
        </fieldset>

        <h3 className={styles.subsection}>Подключение дополнительных услуг</h3>
        <fieldset className={styles.fieldset}>
          <legend>Услуга &quot;SMS-оповещение&quot; о совершенных операциях</legend>
          <label className={styles.radio}><input type="radio" name="sms" defaultChecked /> Да</label>
          <label className={styles.radio}><input type="radio" name="sms" /> Нет</label>
        </fieldset>

        <label className={styles.field}>
          <span>Мобильный телефон</span>
          <div className={styles.phoneInput}>
            <span>🇧🇾</span>
            <input
              type="text"
              placeholder="+375 (__) ___-__-__"
              value={phone}
              onChange={e => { setPhone(e.target.value); handleField('phone', e.target.value); }}
            />
          </div>
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Порядок информирования о совершенных операциях</legend>
          <label className={styles.radio}><input type="radio" name="notify" defaultChecked /> С ограничением суммы операции (без дополнительной платы)</label>
          <label className={styles.radio}><input type="radio" name="notify" /> Без ограничения суммы операции (за дополнительную плату)</label>
        </fieldset>

        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>i</span>
          <span>При подключении второго и последующих телефонных номеров банк осуществляет информирование о совершенных операциях без ограничения по сумме (за дополнительную плату)</span>
        </div>

        <h3 className={styles.subsection}>Лимиты</h3>
        <label className={styles.checkbox}>
          <input type="checkbox" onChange={e => handleField('limitsAck', String(e.target.checked))} />
          <span>Уведомлены об установленных ОАО «Сбер Банк» (далее — Банк) лимитах по расходным операциям при использовании корпоративной карты в сутки, которые размещены на сайте Банка (<a href="https://www.sber-bank.by">www.sber-bank.by</a>)</span>
        </label>
      </div>
    </DocumentFormLayout>
  );
};

export default CorporateCardForm;
