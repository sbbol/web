import Modal from '../Modal';
import type { Account } from '../../store/AppContext';
import styles from './AccountDetailsModal.module.css';

interface Props {
  account: Account;
  onClose: () => void;
}

const AccountDetailsModal = ({ account, onClose }: Props) => {
  const copyDetails = async () => {
    const text = `Вид счета: Текущий (расчетный) счет
Номер счета: ${account.number}
Наименование банка: ОАО 'СБЕР БАНК' Г.МИНСК
БИК банка: BPSBBY2X
Наименование организации: DEMO ЮРИДИЧЕСКОЕ ЛИЦО
УНП: 000000000
Юридический адрес: Г. МИНСК, УЛ DEMO`;

    await navigator.clipboard.writeText(text);
  };

  const rows = [
    { label: 'Вид счета', value: 'Текущий (расчетный) счет' },
    { label: 'Номер счета', value: account.number },
    { label: 'Наименование банка', value: "ОАО 'СБЕР БАНК' Г.МИНСК" },
    { label: 'БИК банка', value: 'BPSBBY2X' },
    { label: 'Наименование организации', value: 'DEMO ЮРИДИЧЕСКОЕ ЛИЦО' },
    { label: 'УНП', value: '000000000' },
    { label: 'Юридический адрес', value: 'Г. МИНСК, УЛ DEMO' },
  ];

  return (
    <Modal
      title="Реквизиты"
      onClose={onClose}
      width={760}
      footer={
        <>
          <button type="button" className={styles.btnSecondary}>
            Сохранить как
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className={styles.btnSecondary}>
            Отправить на почту
          </button>
          <button type="button" className={styles.btnPrimary} onClick={copyDetails}>
            Скопировать
          </button>
        </>
      }
    >
      <div className={styles.content}>
        {rows.map(row => (
          <div key={row.label} className={styles.row}>
            <span className={styles.label}>{row.label}</span>
            <span className={styles.value}>{row.value}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AccountDetailsModal;
