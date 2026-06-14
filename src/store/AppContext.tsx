import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { fetchAccounts, fetchProfile } from '../api/data';

export interface Account {
  id: string;
  number: string;
  currency: string;
  balance: string;
  currencyCode: string;
  name: string;
  description?: string;
  hidden?: boolean;
  noInfo?: boolean;
}

interface AppState {
  user: {
    name: string;
    avatar: string;
  } | null;
  accounts: Account[];
  totalBalance: string;
  loading: boolean;
  refresh: () => Promise<void>;
}

export const AppContext = createContext<AppState>({} as AppState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppState['user']>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalance, setTotalBalance] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [profile, accs] = await Promise.all([fetchProfile(), fetchAccounts()]);
      setUser({ name: profile.name, avatar: profile.avatar });
      setTotalBalance(profile.totalBalance);
      setAccounts(accs);
    } catch {
      setUser({ name: 'DEMO ЮРИДИЧЕСКОЕ ЛИЦО', avatar: '' });
      setAccounts([]);
      setTotalBalance('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ user, accounts, totalBalance, loading, refresh: loadData }}>
      {children}
    </AppContext.Provider>
  );
};
