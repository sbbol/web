import { createContext, useState, useEffect, type ReactNode } from 'react';

interface Account {
  id: string;
  number: string;
  currency: string;
  balance: number;
}

interface AppState {
  user: { name: string; avatar: string } | null;
  accounts: Account[];
  totalBalance: string;
}

export const AppContext = createContext<AppState>({} as AppState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    accounts: [],
    totalBalance: '0.00 BYN',
  });

  useEffect(() => {
    // имитация загрузки данных с API
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setState(prev => ({ ...prev, user: data.user })));
    // загрузка счетов...
  }, []);

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};