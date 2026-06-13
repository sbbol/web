import Modal from '../Modal';
import styles from './NewEmployeeModal.module.css';

interface Props {
  onClose: () => void;
}

const NewEmployeeModal = ({ onClose }: Props) => (
  <Modal
    title="Новый сотрудник"
    onClose={onClose}
    width={720}
    footer={
      <>
        <button type="button" className={styles.btnSecondary} onClick={onClose}>
          Закрыть
        </button>
        <button type="button" className={styles.btnPrimary} onClick={onClose}>
          Сохранить
        </button>
      </>
    }
  >
    <div className={styles.form}>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span>Фамилия</span>
          <input type="text" />
        </label>
        <label className={styles.field}>
          <span>Имя</span>
          <input type="text" />
        </label>
      </div>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span>Отчество</span>
          <input type="text" />
        </label>
        <label className={styles.field}>
          <span>Фамилия латиницей</span>
          <input type="text" />
        </label>
      </div>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span>Имя латиницей</span>
          <input type="text" />
        </label>
        <label className={styles.field}>
          <span>Лицевой счет</span>
          <input type="text" />
        </label>
      </div>
      <label className={styles.field}>
        <span>Должность</span>
        <input type="text" />
      </label>
      <button type="button" className={styles.linkBtn}>+ Указать обязанности</button>
      <label className={styles.field}>
        <span>
          Счет корпкарты
          <span className={styles.helpIcon} title="Подсказка">?</span>
        </span>
        <input type="text" />
      </label>

      <h3 className={styles.sectionTitle}>Удостоверяющий документ</h3>
      <label className={styles.field}>
        <span>Наименование документа</span>
        <select defaultValue="">
          <option value="" disabled>Выберите документ</option>
          <option>Паспорт гражданина РБ</option>
        </select>
      </label>
      <label className={styles.field}>
        <span>Серия и номер документа</span>
        <input type="text" />
      </label>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span>Дата выдачи</span>
          <input type="text" placeholder="__ . __ . ____" />
        </label>
        <label className={styles.field}>
          <span>
            Кем выдан
            <span className={styles.helpIcon}>?</span>
          </span>
          <input type="text" />
        </label>
      </div>
      <label className={styles.field}>
        <span>Срок действия</span>
        <input type="text" placeholder="__ . __ . ____" />
      </label>

      <h3 className={styles.sectionTitle}>Контактные данные</h3>
      <label className={styles.field}>
        <span>Мобильный телефон</span>
        <div className={styles.phoneInput}>
          <span className={styles.flag}>🇧🇾</span>
          <input type="text" placeholder="+375 (__) ___-__-__" />
        </div>
      </label>
      <label className={styles.field}>
        <span>Рабочий телефон</span>
        <div className={styles.phoneInput}>
          <span className={styles.flag}>🇧🇾</span>
          <input type="text" placeholder="+375 (__) ___-__-__" />
        </div>
      </label>
      <label className={styles.field}>
        <span>Домашний телефон</span>
        <div className={styles.phoneInput}>
          <span className={styles.flag}>🇧🇾</span>
          <input type="text" placeholder="+375 (__) ___-__-__" />
        </div>
      </label>
      <label className={styles.field}>
        <span>Электронная почта</span>
        <input type="email" placeholder="user@domain.com" />
      </label>
      <label className={styles.field}>
        <span>Доп. информация</span>
        <textarea rows={3} />
      </label>
      <label className={styles.field}>
        <span>Адрес проживания</span>
        <input type="text" />
      </label>
    </div>
  </Modal>
);

export default NewEmployeeModal;
