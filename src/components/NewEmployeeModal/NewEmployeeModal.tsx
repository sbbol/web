import { useState } from 'react';
import Modal from '../Modal';
import PrefillBanner from '../PrefillBanner/PrefillBanner';
import { createEmployee } from '../../api/data';
import { useDraftTracker } from '../../hooks/useDraftTracker';
import styles from './NewEmployeeModal.module.css';

export interface EmployeePrefill {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  position?: string;
  phone?: string;
}

interface Props {
  onClose: () => void;
  onSaved?: () => void;
  prefill?: EmployeePrefill;
}

const NewEmployeeModal = ({ onClose, onSaved, prefill }: Props) => {
  const fromDale = Boolean(prefill && Object.keys(prefill).length > 0);
  const { trackField, saveNow } = useDraftTracker({
    draftType: 'employee',
    title: 'Новый сотрудник',
    route: '/other',
  });

  const [lastName, setLastName] = useState(prefill?.lastName || '');
  const [firstName, setFirstName] = useState(prefill?.firstName || '');
  const [middleName, setMiddleName] = useState(prefill?.middleName || '');
  const [position, setPosition] = useState(prefill?.position || '');
  const [account, setAccount] = useState('');
  const [phone, setPhone] = useState(prefill?.phone || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!lastName.trim() && !firstName.trim()) {
      setError('Укажите имя или фамилию');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await createEmployee({ lastName, firstName, middleName, position, account, phone });
      onSaved?.();
    } catch {
      setError('Не удалось сохранить сотрудника');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    trackField('lastName', lastName);
    trackField('firstName', firstName);
    trackField('middleName', middleName);
    trackField('position', position);
    trackField('account', account);
    trackField('phone', phone);
    await saveNow();
    onClose();
  };

  return (
    <Modal
      title="Новый сотрудник"
      onClose={onClose}
      width={720}
      footer={
        <>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            Закрыть
          </button>
          <button type="button" className={styles.btnOutline} onClick={handleSaveDraft}>
            Сохранить черновик
          </button>
          <button type="button" className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
            {saving ? 'Сохранение…' : 'Сохранить'}
          </button>
        </>
      }
    >
      <PrefillBanner visible={fromDale} />
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.form}>
        <div className={styles.row2}>
          <label className={styles.field}>
            <span>Фамилия</span>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Имя</span>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </label>
        </div>
        <div className={styles.row2}>
          <label className={styles.field}>
            <span>Отчество</span>
            <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} />
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
            <input type="text" value={account} onChange={e => setAccount(e.target.value)} />
          </label>
        </div>
        <label className={styles.field}>
          <span>Должность</span>
          <input type="text" value={position} onChange={e => setPosition(e.target.value)} />
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
            <input type="text" placeholder="+375 (__) ___-__-__" value={phone} onChange={e => setPhone(e.target.value)} />
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
};

export default NewEmployeeModal;
