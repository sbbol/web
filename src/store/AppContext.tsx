import {
  createContext,
  useState,
  type ReactNode,
} from 'react';

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
}

export const AppContext = createContext<AppState>({} as AppState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state] = useState<AppState>({
    user: {
      name: 'DEMO ЮРИДИЧЕСКОЕ ЛИЦО',
      avatar: '',
    },
    accounts: [
      {
        id: '1',
        currency: 'BYN',
        number: 'BY15 BPSB 3612 0000 0000 0933 0000',
        name: 'Текущий счет (расчетный)',
        description: 'На строительство дороги по договору 4512...',
        balance: '16 780,00',
        currencyCode: 'BYN',
        hidden: true,
      },
      {
        id: '2',
        currency: 'RUB',
        number: 'BY15 BPSB 3612 0000 0000 0933 0000',
        name: 'Российские рубли',
        balance: '12 226 780,00',
        currencyCode: 'RUB',
      },
      {
        id: '3',
        currency: 'BYN',
        number: 'BY15 BPSB 3612 0000 0000 0933 0000',
        name: 'Текущий счет (расчетный)',
        balance: '',
        currencyCode: 'BYN',
        noInfo: true,
      },
      {
        id: '4',
        currency: 'BYN',
        number: 'BY15 BPSB 3612 0000 0000 0933 0000',
        name: 'Специальный счет',
        balance: '1 999 222 999 226 780,00',
        currencyCode: 'BYN',
        hidden: true,
      },
    ],
    totalBalance: '32 405,00 BYN',
  });

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};
