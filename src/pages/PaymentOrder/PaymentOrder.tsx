import styles from './PaymentOrder.module.css';

interface Props {
  onClose: () => void;
}

const PaymentOrder = ({ onClose }: Props) => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>ПЛАТЕЖНОЕ ПОРУЧЕНИЕ (BYN) ВНУТРИ РБ</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className={styles.form}>
          <div className={styles.block}>
            <label>Время приема документов</label>
            <input value="09:00 - 16:00" readOnly />
          </div>

          <label>Получатель</label>

          <div className={styles.tabs}>
            <button className={styles.active}>
              Из справочника
            </button>

            <button>
              Ввести вручную
            </button>
          </div>

          <input placeholder="Наименование контрагента или номер счета" />

          <label>Плательщик</label>

          <div className={styles.payer}>
            <span>Со счета</span>

            <input
              value="DEMO ЮРИДИЧЕСКОЕ ЛИЦО"
              readOnly
            />
          </div>

          <button className={styles.linkBtn}>
            Реквизиты
          </button>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            Указать фактического плательщика
          </label>

          <label>Сумма</label>

          <div className={styles.amount}>
            <input defaultValue="0.00" />
            <span>BYN</span>
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            Указать НДС
          </label>

          <label>Назначение платежа</label>

          <textarea placeholder="Назначение платежа" />

          <label className={styles.checkbox}>
            <input type="checkbox" />
            Указать документ-основание
          </label>

          <label>Категория назначения платежа</label>

          <input />

          <label>Код назначения платежа</label>

          <select>
            <option>Выберите код</option>
          </select>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            Указать исполнительный документ
          </label>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            Добавить распоряжение на бронирование денежных средств
          </label>

          <div className={styles.row}>
            <div>
              <label>№ документа</label>
              <input value="6413991" readOnly />
            </div>

            <div>
              <label>Дата документа</label>
              <input value="10.06.2026" readOnly />
            </div>

            <div>
              <label>Очередность платежа</label>
              <input value="21" readOnly />
            </div>
          </div>

          <div className={styles.actions}>
            <button>
              Сохранить как черновик
            </button>

            <button>
              Печатная версия
            </button>

            <button>
              Проверить
            </button>

            <button className={styles.primary}>
              На подпись
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOrder;