import DocumentFormLayout, { DocFormFooter } from '../../components/DocumentFormLayout';
import styles from './ServicePackageForm.module.css';

const ServicePackageForm = () => (
  <DocumentFormLayout
    title="ИЗВЕЩЕНИЕ О СМЕНЕ (ПОДКЛЮЧЕНИИ) ПАКЕТА УСЛУГ"
    sidebar={
      <div className={styles.metaBox}>
        <label className={styles.metaField}>
          <span>№ документа</span>
          <input type="text" defaultValue="177" />
        </label>
        <label className={styles.metaField}>
          <span>Дата документа</span>
          <input type="text" defaultValue="13.06.2026" />
        </label>
      </div>
    }
    footer={<DocFormFooter />}
  >
    <div className={styles.form}>
      <div className={styles.orgName}>DEMO ЮРИДИЧЕСКОЕ ЛИЦО</div>

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
          <select defaultValue="acc1">
            <option value="acc1">BY51 BPSB 3012 2222 2222 2933 2222</option>
          </select>
          <span className={styles.accountSub}>BYN • Текущий (расчетный) счет</span>
        </label>
        <div className={styles.orgRow}>
          <span>DEMO ЮРИДИЧЕСКОЕ ЛИЦО</span>
          <button type="button" className={styles.linkBtn}>Реквизиты</button>
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" />
          <span>Ознакомлен со Сборником вознаграждений за операции, осуществляемые ОАО &quot;Сбер Банк&quot;</span>
        </label>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Уполномоченное лицо</h3>
        <label className={styles.field}>
          <span>ФИО руководителя / иного лица... ?</span>
          <div className={styles.inputWithIcon}>
            <input type="text" placeholder="Укажите фамилию, имя, отчество" />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 7H16M4 7L7 4M4 7L7 10" stroke="#B2B8BF" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </label>
        <label className={styles.field}>
          <span>Должность</span>
          <input type="text" placeholder="Укажите должность" />
        </label>
        <label className={styles.field}>
          <span>Действует на основании ?</span>
          <select defaultValue=""><option value="" disabled>Выберите</option></select>
        </label>
      </section>
    </div>
  </DocumentFormLayout>
);

export default ServicePackageForm;
