import { useNavigate } from 'react-router-dom';
import styles from './Products.module.css';

const products = [
  {
    id: 'card-management',
    title: 'Управление картами',
    description: 'Просмотр и управление корпоративными и бизнес-картами',
    path: '/products/card-management',
  },
  {
    id: 'card-applications',
    title: 'Получение корпоративной карты / бизнес-карты',
    description: 'Заявления на выпуск корпоративных и бизнес-карт',
    path: '/products/card-applications',
  },
  {
    id: 'service-package',
    title: 'Смена (подключение) пакета услуг',
    description: 'Извещения о смене или подключении пакета услуг',
    path: '/products/service-package-notices',
  },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Продукты и услуги</h1>
      <div className={styles.grid}>
        {products.map(item => (
          <button
            key={item.id}
            type="button"
            className={styles.card}
            onClick={() => navigate(item.path)}
          >
            <div className={styles.cardIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 15C4 13.3431 5.34315 12 7 12H33C34.6569 12 36 13.3431 36 15V20.143C36 21.5717 34.9924 22.8022 33.5918 23.084L24.1679 24.9804L23.7733 23.0196L33.1973 21.1233C33.6642 21.0294 34 20.6192 34 20.143V15C34 14.4477 33.5523 14 33 14H7C6.44772 14 6 14.4477 6 15V20.1239C6 20.6044 6.34178 21.017 6.81392 21.1064L16.9048 23.0175L16.5327 24.9825L6.44176 23.0715C5.02535 22.8032 4 21.5654 4 20.1239V15Z" fill="#107F8C" />
                <path fillRule="evenodd" clipRule="evenodd" d="M6 24C6.55228 24 7 24.4477 7 25V31C7 31.5523 7.44772 32 8 32H32C32.5523 32 33 31.5523 33 31V25C33 24.4477 33.4477 24 34 24C34.5523 24 35 24.4477 35 25V31C35 32.6569 33.6569 34 32 34H8C6.34315 34 5 32.6569 5 31V25C5 24.4477 5.44772 24 6 24Z" fill="#107F8C" />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
            <svg className={styles.chevron} width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="#B2B8BF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
