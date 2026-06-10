import styles from './AccountDetailsModal.module.css';
import type { Account } from '../../store/AppContext';

interface Props {
  account: Account;
  onClose: () => void;
}

const AccountDetailsModal = ({
  account,
  onClose,
}: Props) => {
  const copyDetails = async () => {
    const text = `
Реквизиты счета

Вид счета: ${account.name}
Номер счета: ${account.number}
Наименование банка: ОАО 'СБЕР БАНК' Г.МИНСК
БИК банка: BPSBBY2X
Наименование организации: DEMO ЮРИДИЧЕСКОЕ ЛИЦО
УНП: 000000000
Юридический адрес: Г. МИНСК, УЛ DEMO
`;

    await navigator.clipboard.writeText(text);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className={styles.header}>
          <h2>Реквизиты</h2>

          <button
            className={styles.closeBtn}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <span>Вид счета</span>
            <span>{account.name}</span>
          </div>

          <div className={styles.row}>
            <span>Номер счета</span>
            <span>{account.number}</span>
          </div>

          <div className={styles.row}>
            <span>Наименование банка</span>
            <span>
              ОАО 'СБЕР БАНК' Г.МИНСК
            </span>
          </div>

          <div className={styles.row}>
            <span>БИК банка</span>
            <span>BPSBBY2X</span>
          </div>

          <div className={styles.row}>
            <span>
              Наименование организации
            </span>
            <span>
              DEMO ЮРИДИЧЕСКОЕ ЛИЦО
            </span>
          </div>

          <div className={styles.row}>
            <span>УНП</span>
            <span>000000000</span>
          </div>

          <div className={styles.row}>
            <span>Юридический адрес</span>
            <span>
              Г. МИНСК, УЛ DEMO
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button>
            Сохранить как
          </button>

          <button>
            Отправить на почту
          </button>

          <button onClick={copyDetails}>
            Скопировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsModal;