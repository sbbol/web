import { useContext, useEffect, useState } from 'react';
import DocumentFormLayout, { DocFormFooter } from '../../components/DocumentFormLayout';
import PrefillBanner from '../../components/PrefillBanner/PrefillBanner';
import { useDraftTracker } from '../../hooks/useDraftTracker';
import { useFormPrefill } from '../../hooks/useFormPrefill';
import { AppContext } from '../../store/AppContext';
import styles from './ServicePackageForm.module.css';

const ServicePackageForm = () => {
  const { user, accounts } = useContext(AppContext);
  const { fromDale, get } = useFormPrefill('/products/service-package-form');
  const { trackField, saveNow, completeDraft } = useDraftTracker({
    draftType: 'service_package_form',
    title: 'Извещение о смене пакета услуг',
    route: '/products/service-package-form',
  });

  const [priorityAccount, setPriorityAccount] = useState(accounts[0]?.id || '');
  const [directorName, setDirectorName] = useState('');
  const [directorPosition, setDirectorPosition] = useState('');

  useEffect(() => {
    if (fromDale) {
      const name = get('directorName');
      const position = get('directorPosition');
      const acc = get('priorityAccount');
      if (name) { setDirectorName(name); trackField('directorName', name); }
      if (position) { setDirectorPosition(position); trackField('directorPosition', position); }
      if (acc) { setPriorityAccount(acc); trackField('priorityAccount', acc); }
    }
  }, [fromDale, get, trackField]);

  const handleField = (name: string, value: string) => {
    trackField(name, value);
  };

  return (
    <DocumentFormLayout
      title="ИЗВЕЩЕНИЕ О СМЕНЕ (ПОДКЛЮЧЕНИИ) ПАКЕТА УСЛУГ"
      sidebar={
        <div className={styles.metaBox}>
          <label className={styles.metaField}>
            <span>№ документа</span>
            <input type="text" defaultValue="177" readOnly />
          </label>
          <label className={styles.metaField}>
            <span>Дата документа</span>
            <input type="text" defaultValue="13.06.2026" readOnly />
          </label>
        </div>
      }
      footer={<DocFormFooter onSaveDraft={() => saveNow()} onContinue={() => completeDraft()} />}
    >
      <div className={styles.form}>
        <PrefillBanner visible={fromDale} />
        <div className={styles.orgName}>{user?.name || ''}</div>

        <div className={styles.packageBox}>
          <div className={styles.packageHeader}>
            <span>Желаемый пакет услуг</span>
            <button type="button" className={styles.editBtn} aria-label="Редактировать">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="#B2B8BF" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
          <div className={styles.packageName}>ПАРТНЕР</div>
          <div className={styles.packageDetails}>Включено переводов: 10</div>
          <div className={styles.packageDetails}>Стоимость: 22.00 BYN</div>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Подключаемые счета</h3>
          <p className={styles.hint}>Вы можете добавить один или несколько счетов к пакету операций</p>
          <button type="button" className={styles.btnOutline}>Добавить счет</button>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Порядок взимания вознаграждения</h3>
          <label className={styles.field}>
            <span>Приоритетный счет для списания вознаграждения</span>
            <select
              value={priorityAccount}
              onChange={e => { setPriorityAccount(e.target.value); handleField('priorityAccount', e.target.value); }}
            >
              {accounts.map(a => (
                <option key={a.id} value={a.id}>{a.number}</option>
              ))}
            </select>
            <span className={styles.accountSub}>
              {accounts.find(a => a.id === priorityAccount)?.currency} • {accounts.find(a => a.id === priorityAccount)?.name}
            </span>
          </label>
          <div className={styles.orgRow}>
            <span>{user?.name}</span>
            <button type="button" className={styles.linkBtn}>Реквизиты</button>
          </div>
          <label className={styles.checkbox}>
            <input type="checkbox" onChange={e => handleField('feesAck', String(e.target.checked))} />
            <span>Ознакомлен со Сборником вознаграждений за операции, осуществляемые ОАО &quot;Сбер Банк&quot;</span>
          </label>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Уполномоченное лицо</h3>
          <label className={styles.field}>
            <span>ФИО руководителя / иного лица... ?</span>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                placeholder="Укажите фамилию, имя, отчество"
                value={directorName}
                onChange={e => { setDirectorName(e.target.value); handleField('directorName', e.target.value); }}
              />
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 7H16M4 7L7 4M4 7L7 10" stroke="#B2B8BF" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </label>
          <label className={styles.field}>
            <span>Должность</span>
            <input
              type="text"
              placeholder="Укажите должность"
              value={directorPosition}
              onChange={e => { setDirectorPosition(e.target.value); handleField('directorPosition', e.target.value); }}
            />
          </label>
          <label className={styles.field}>
            <span>Действует на основании ?</span>
            <select defaultValue="" onChange={e => handleField('authorityBasis', e.target.value)}>
              <option value="" disabled>Выберите</option>
              <option value="charter">Устав</option>
              <option value="power_of_attorney">Доверенность</option>
            </select>
          </label>
        </section>
      </div>
    </DocumentFormLayout>
  );
};

export default ServicePackageForm;
