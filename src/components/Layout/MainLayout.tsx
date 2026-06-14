import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import FloatingButton from '../FloatingButton';
import ExplainTooltip from '../LanguageAdapter/ExplainTooltip';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar />
      <div className={styles.contentWrapper}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <Footer />
      <FloatingButton />
      <ExplainTooltip />
    </div>
  );
};

export default MainLayout;
