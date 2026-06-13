import DocumentFormLayout, { DocFormFooter } from '../../components/DocumentFormLayout';
import styles from '../CorporateCardForm/CorporateCardForm.module.css';

const steps = ['Карта', 'Держатель', 'Подтверждения', 'Контакты', 'Итоговый'];

const BusinessCardForm = () => (
  <DocumentFormLayout
    title="ЗАЯВЛЕНИЕ НА ПОЛУЧЕНИЕ БИЗНЕС-КАРТЫ"
    sidebar={
      <div className={styles.metaBox}>
        <label className={styles.metaField}>
          <span>№ документа</span>
          <input type="text" defaultValue="143" />
        </label>
        <label className={styles.metaField}>
          <span>Дата документа</span>
          <input type="text" defaultValue="13.06.2026" readOnly className={styles.readonly} />
        </label>
      </div>
    }
    footer={<DocFormFooter primaryLabel="Продолжить" />}
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
      <label className={styles.field}>
        <span>Счет, к которому выпускается бизнес-карта</span>
        <select defaultValue=""><option value="" disabled>Выберите счет</option></select>
      </label>

      <label className={styles.field}>
        <span>Наименование организации латиницей (для указания на карте)</span>
        <input type="text" defaultValue="DEMO IURIDICHESKOE LITCO" className={styles.inputError} />
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
          <input type="text" placeholder="+375 (__) ___-__-__" />
        </div>
      </label>

      <fieldset className={styles.fieldset}>
        <legend>Порядок информирования о совершенных операциях</legend>
        <label className={styles.radio}><input type="radio" name="notify" defaultChecked /> с ограничением суммы операции (без дополнительной платы)</label>
        <label className={styles.radio}><input type="radio" name="notify" /> без ограничения суммы операции (за дополнительную плату)</label>
      </fieldset>

      <div className={styles.infoBox}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#107F8C" strokeWidth="1.5" />
          <path d="M10 9V14M10 6V6.5" stroke="#107F8C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>При подключении второго и последующих телефонных номеров банк осуществляет информирование о совершенных операциях без ограничения по сумме (за дополнительную плату)</span>
      </div>
      <button type="button" className={styles.linkBtn}>+ Добавить мобильный телефон</button>

      <label className={styles.checkbox}>
        <input type="checkbox" />
        <span>Лимиты — Уведомлены об установленных ОАО «Сбер Банк» лимитах по расходным операциям, размещённых <a href="https://www.sber-bank.by">на сайте банка</a></span>
      </label>
    </div>
  </DocumentFormLayout>
);

export default BusinessCardForm;
