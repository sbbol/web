import styles from './InstantPayment.module.css';

interface Props {
  onClose: () => void;
}

const InstantPayment = ({
  onClose,
}: Props) => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>МГНОВЕННЫЙ ПЛАТЕЖ (BYN)</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className={styles.form}>
          <label>Получатель</label>

          <input
            placeholder="Наименование контрагента или номер счета"
          />

          <label>Плательщик</label>

          <input
            value="DEMO ЮРИДИЧЕСКОЕ ЛИЦО"
            readOnly
          />

          <label>Сумма</label>

          <input defaultValue="0.00" />

          <label>Назначение платежа</label>

          <textarea
            placeholder="Назначение платежа"
          />

          <label>Код назначения платежа</label>

          <select>
            <option>
              Выберите код
            </option>
          </select>

          <div className={styles.row}>
            <div>
              <label>№ документа</label>
              <input value="6413991" readOnly />
            </div>

            <div>
              <label>Дата документа</label>
              <input
                value="10.06.2026"
                readOnly
              />
            </div>

            <div>
              <label>Очередность</label>
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

          <div className={styles.footer}>
            © ОАО «Сбер Банк», 2026
            <br />
            www.sber-bank.by
            <br />
            Центр клиентской поддержки:
            <br />
            +375 17 359-99-11
            <br />
            +375 29 359-99-11
            <br />
            +375 33 348-99-11
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantPayment;