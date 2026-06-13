import type { ReactNode } from 'react';

type IconProps = { className?: string };

export const PaymentOrderIcon = ({ className }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" width="40" height="40">
    <g fill="none" fillRule="nonzero">
      <path fill="currentColor" d="M34 15v14a3 3 0 0 1-3 3H10a4 4 0 0 1-4-4V10.98a3 3 0 0 1 3-3h20.014a3.004 3.004 0 0 1 3 3.02l-.008 1.173A3.001 3.001 0 0 1 34 15zm-3.986-4.014a1 1 0 0 0-.993-1.007H9a1 1 0 0 0-1 1V11c0 .442.55 1 1 1h21.007l.007-1.014zM8 28a2 2 0 0 0 2 2h21a1 1 0 0 0 1-1V15a1 1 0 0 0-1-1H9c-.344 0-.682-.07-1-.198V28zm19-7h2v2h-2v-2z" />
      <path fill="currentColor" d="M32 19h-5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v-6zm-5-2h7v10h-7a4 4 0 0 1-4-4v-2a4 4 0 0 1 4-4z" />
    </g>
  </svg>
);

export const InstantPaymentIcon = ({ className }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 73 73" width="40" height="40">
    <path d="M13.0891 24.2128V20.6128C13.0891 18.6246 14.7009 17.0128 16.6891 17.0128H52.6891C54.6773 17.0128 56.2891 18.6246 56.2891 20.6128V24.2128M13.0891 24.2128V53.0128C13.0891 55.001 14.7009 56.6128 16.6891 56.6128H56.2891C58.2773 56.6128 59.8891 55.001 59.8891 53.0128V27.8128C59.8891 25.8246 58.2773 24.2128 56.2891 24.2128V24.2128M13.0891 24.2128H56.2891" stroke="currentColor" strokeWidth="3.6" />
    <path d="M49.0892 33.2128H59.8892V47.6128H49.0892C46.1069 47.6128 43.6892 45.1952 43.6892 42.2128V38.6128C43.6892 35.6305 46.1069 33.2128 49.0892 33.2128Z" stroke="currentColor" strokeWidth="3.6" />
    <rect fill="currentColor" x="49.0891" y="38.6129" width="3.6" height="3.6" />
    <g clipPath="url(#clipInstant)">
      <path d="M47.2374 23.2128H37.1908L46.5041 8.54613H34.7708L23.7708 30.5461H32.4241L23.7708 51.0795L47.2374 23.2128Z" fill="white" />
      <path d="M37.4885 8.82733L34.9666 8.67978L24.2241 30.0889L26.7461 30.2365L37.4885 8.82733Z" fill="#FF9900" />
      <path d="M44.2892 22.7932L26.6892 43.6932L23.7559 50.6599L47.2225 22.7932H44.2892Z" fill="#FF9900" />
    </g>
    <defs><clipPath id="clipInstant"><rect width="44" height="44" fill="white" transform="translate(13.4893 7.81284)" /></clipPath></defs>
  </svg>
);

export const CorpCardIcon = ({ className }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 72 72" width="48" height="48">
    <path fill="currentColor" fillRule="evenodd" d="M11.6 30.6v4.376h38.205V30.6H11.6zm0 23.641V39.976h38.205V54.24H11.6zM11.427 27A3.427 3.427 0 0 0 8 30.427v23.987a3.427 3.427 0 0 0 3.427 3.427h38.551a3.427 3.427 0 0 0 3.427-3.427V30.427A3.427 3.427 0 0 0 49.978 27H11.427zm3.699 18.246c-.71 0-1.285.575-1.285 1.285v4.284c0 .71.575 1.285 1.285 1.285h4.283c.71 0 1.285-.576 1.285-1.285V46.53c0-.71-.575-1.285-1.285-1.285h-4.283z" clipRule="evenodd" />
    <rect width="6.854" height="6.854" x="13.841" y="45.246" fill="#FF9900" rx="1.285" />
    <path fill="currentColor" fillRule="evenodd" d="M22.427 14.156A3.427 3.427 0 0 0 19 17.583v4.283h45.404v5.14H50.13a3.427 3.427 0 0 1 3.274 3.424v14.567h7.574a3.427 3.427 0 0 0 3.427-3.427V17.583a3.427 3.427 0 0 0-3.427-3.427H22.427zM54.11 35.401c0-.71.575-1.286 1.285-1.286h4.284c.71 0 1.285.576 1.285 1.286v4.283c0 .71-.576 1.285-1.285 1.285h-4.284c-.71 0-1.285-.575-1.285-1.285v-4.283z" clipRule="evenodd" />
  </svg>
);

export const BusinessCardIcon = ({ className }: IconProps) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 72 72" width="48" height="48">
    <path fill="currentColor" d="M42.534 51.641c.994 0 1.8-.806 1.8-1.8s-.806-1.8-1.8-1.8v3.6zM54.538 34.71c0 .994.806 1.8 1.8 1.8s1.8-.806 1.8-1.8h-3.6zM14.359 20.8h38.552v-3.6H14.359v3.6zm-1.626 25.614V22.427h-3.6v23.987h3.6zm20.902 1.627H14.36v3.6h19.276v-3.6zm8.9 0h-8.9v3.6h8.9v-3.6zm12.003-25.614v12.282h3.6V22.427h-3.6zM9.133 46.414c0 2.887 2.34 5.227 5.226 5.227v-3.6c-.898 0-1.626-.728-1.626-1.627h-3.6zM52.91 20.8c.898 0 1.627.728 1.627 1.627h3.6c0-2.887-2.34-5.227-5.227-5.227v3.6zm-38.552-3.6c-2.886 0-5.226 2.34-5.226 5.227h3.6c0-.899.728-1.627 1.626-1.627v-3.6z" />
    <path fill="currentColor" d="M11.633 26.967H56.181V32.107H11.633z" />
    <rect width="6.854" height="6.854" x="16.773" y="37.246" fill="#FF9900" rx="1.285" />
    <path stroke="#FF9900" strokeWidth="2.3" d="M60.748 48.537v-5.99h-13v5.99M60.748 48.537c0 1.965-2.91 3.557-6.5 3.557s-6.5-1.592-6.5-3.557M47.553 45.835c2.522 1.856 8.375 3.729 13.444-.128" />
    <path fill="#fff" stroke="#FF9900" strokeWidth="2.3" d="M60.745 41.427c0 .27-.28.873-1.575 1.476-1.2.559-2.938.935-4.92.935-1.983 0-3.721-.376-4.922-.935-1.294-.603-1.575-1.206-1.575-1.476s.282-.873 1.575-1.476c1.2-.56 2.94-.936 4.921-.936 1.983 0 3.721.377 4.921.936 1.294.603 1.575 1.206 1.575 1.476z" />
  </svg>
);

export interface DocumentTile {
  id: string;
  label: string;
  icon: ReactNode;
  coloredIcon: ReactNode;
  hasInfo?: boolean;
  hasChevron?: boolean;
}

export const paymentDocuments: DocumentTile[] = [
  {
    id: 'payment-order',
    label: 'Платежное поручение (BYN) внутри РБ',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
  },
  {
    id: 'instant-payment',
    label: 'Мгновенный платеж (BYN)',
    icon: <InstantPaymentIcon />,
    coloredIcon: <InstantPaymentIcon className="colored" />,
  },
  {
    id: 'erip',
    label: 'Платеж в ЕРИП (административные процедуры)',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
    hasInfo: true,
  },
  {
    id: 'fx-internal',
    label: 'Перевод инвалюты внутри РБ',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
  },
  {
    id: 'fx-external',
    label: 'Перевод инвалюты за пределы РБ',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
    hasChevron: true,
  },
  {
    id: 'corp-card-transfer',
    label: 'Перевод на корпокарту',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
  },
  {
    id: 'salary-contract',
    label: 'Выплаты физическим лицам (по договору с банком)',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
  },
  {
    id: 'salary-no-contract',
    label: 'Выплаты физическому лицу (без договора с банком)',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
  },
  {
    id: 'product-request',
    label: 'Заявка на предоставление продукта (услуги)',
    icon: <PaymentOrderIcon />,
    coloredIcon: <PaymentOrderIcon className="colored" />,
  },
];

export const cardDocuments: DocumentTile[] = [
  {
    id: 'corp-card',
    label: 'Получение корпоративной карты',
    icon: <CorpCardIcon />,
    coloredIcon: <CorpCardIcon className="colored" />,
  },
  {
    id: 'business-card',
    label: 'Получение бизнес-карты',
    icon: <BusinessCardIcon />,
    coloredIcon: <BusinessCardIcon className="colored" />,
  },
];
