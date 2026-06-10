import styles from './NewDocumentModal.module.css';

interface Props {
  onClose: () => void;
  onInstantPayment: () => void;
  onPaymentOrder: () => void;
}

const documents = [
  'Платежное поручение (BYN) внутри РБ',
  'Мгновенный платеж (BYN)',
  'Платеж в ЕРИП (административные процедуры)',
  'Перевод инвалюты внутри РБ',
  'Перевод инвалюты за пределы РБ',
  'Перевод на корпокарту',
  'Выплаты физическим лицам (по договору с банком)',
  'Выплаты физическому лицу (без договора с банком)',
  'Заявка на предоставление продукта (услуги)',
];

const NewDocumentModal = ({
  onClose,
  onInstantPayment,
  onPaymentOrder,
}: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Новый документ</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className={styles.list}>
          {documents.map((doc) => (
            <button
              key={doc}
              className={styles.item}
              onClick={() => {
                if (doc.includes('Мгновенный платеж')) {
                  onInstantPayment();
                }
                if (doc.includes('Платежное поручение')) {
                    onPaymentOrder();
                  }
              }}
            >
              {doc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewDocumentModal;