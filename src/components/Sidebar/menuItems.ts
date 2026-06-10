import dashboardIcon from '../../assets/icons/money.svg';
import paymentsIcon from '../../assets/icons/payments.svg';
import statementIcon from '../../assets/icons/statement.svg';
import salaryIcon from '../../assets/icons/salary.svg';
import productsIcon from '../../assets/icons/products.svg';
import servicesIcon from '../../assets/icons/services.svg';
import otherIcon from '../../assets/icons/other.svg';
import settingsIcon from '../../assets/icons/settings.svg';


export interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

export const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Деньги и события', icon: dashboardIcon },
  { path: '/payments', label: 'Расчёты', icon: paymentsIcon },
  { path: '/statement', label: 'Выписка', icon: statementIcon },
  { path: '/salary', label: 'Зарплата', icon: salaryIcon },
  { path: '/products', label: 'Продукты и услуги', icon: productsIcon },
  { path: '/services', label: 'Сервисы', icon: servicesIcon },
  { path: '/other', label: 'Прочее', icon: otherIcon },
  { path: '/settings', label: 'Настройки', icon: settingsIcon },
];