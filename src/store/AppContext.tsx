// store/AppContext.tsx

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
}

interface AppState {
  user: {
    name: string;
    avatar: string;
  } | null;
  accounts: Account[];
  totalBalance: string;
}

export const AppContext =
  createContext<AppState>({} as AppState);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state] = useState<AppState>({
    user: {
      name: 'DEMO ЮРИДИЧЕСКОЕ ЛИЦО',
      avatar: '',
    },

    accounts: [
      {
        id: '1',
        currency: 'BYN',
        number:
          'BY51 BPSB 3012 2222 2222 2933 2222',
        name: 'Текущий (расчетный) счет',
        balance: '200.00',
        currencyCode: 'BYN',
      },

      {
        id: '2',
        currency: 'BYN',
        number:
          'BY69 BPSB 3012 3333 3333 3933 3333',
        name: 'Карточный счет',
        balance: '300.00',
        currencyCode: 'BYN',
      },

      {
        id: '3',
        currency: 'EUR',
        number:
          'BY41 BPSB 3012 0000 0000 0978 0000',
        name: 'Текущий (расчетный) счет',
        balance: '2 000.00',
        currencyCode: 'EUR',
      },
    ],

    totalBalance: '2500.00 BYN',
  });

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};