import DocumentFormLayout, { DocFormFooter } from '../../components/DocumentFormLayout';
import styles from './CorporateCardForm.module.css';

const steps = ['Карта', 'Держатель', 'Подтверждения', 'Контакты', 'Итоговый'];

const CorporateCardForm = () => (
  <DocumentFormLayout
    title="ЗАЯВЛЕНИЕ НА ПОЛУЧЕНИЕ КОРПОРАТИВНОЙ КАРТЫ"
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
        <span>Счет, к которому выпускается корпоративная карта</span>
        <select defaultValue=""><option value="" disabled>Выберите счет</option></select>
      </label>

      <fieldset className={styles.fieldset}>
        <legend>Корпоративную карту выпустить</legend>
        <label className={styles.radio}><input type="radio" name="contract" /> К новому счетному контракту</label>
        <label className={styles.radio}><input type="radio" name="contract" defaultChecked /> К счетному контракту №</label>
      </fieldset>

      <label className={styles.field}>
        <span>Счетной контракт</span>
        <input type="text" placeholder="Укажите номер счетного контракта" />
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
        <label className={styles.radio}><input type="radio" name="notify" defaultChecked /> С ограничением суммы операции (без дополнительной платы)</label>
        <label className={styles.radio}><input type="radio" name="notify" /> Без ограничения суммы операции (за дополнительную плату)</label>
      </fieldset>

      <div className={styles.infoBox}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L12 7H17L13 10L14 15L10 12L6 15L7 10L3 7H8L10 2Z" fill="#107F8C" />
        </svg>
        <span>При подключении второго и последующих телефонных номеров банк осуществляет информирование о совершенных операциях без ограничения по сумме (за дополнительную плату)</span>
      </div>
      <button type="button" className={styles.linkBtn}>+ Добавить мобильный телефон</button>

      <label className={styles.checkbox}>
        <input type="checkbox" />
        <span>Уведомлены об установленных ОАО «Сбер Банк» (далее — Банк) лимитах по расходным операциям при использовании корпоративной карты в сутки, которые размещены на сайте Банка (<a href="https://www.sber-bank.by">www.sber-bank.by</a>)</span>
      </label>
    </div>
  </DocumentFormLayout>
);

export default CorporateCardForm;
