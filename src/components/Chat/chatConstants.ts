export const CHAT_GREETING =
  'Привет, меня зовут Дейл, я твой AI-помощник в Сбербизнесе. Я помогу быстро найти нужный раздел, объясню банковские статусы простыми словами, отвечу на частые вопросы и напомню о незавершённых операциях. Напиши или скажи, что нужно сделать, я с радостью помогу!';

export const POPULAR_QUERIES = [
  'Где скачать выписку?',
  'Как добавить сотрудника?',
  'Почему платеж отклонен?',
] as const;

import iconFeatureDirect from '../../assets/figma/chat/icon-feature-direct.png';
import iconFeatureFaq from '../../assets/figma/chat/icon-feature-faq.png';
import iconFeatureExplain from '../../assets/figma/chat/icon-feature-explain.png';
import iconFeatureDrafts from '../../assets/figma/chat/icon-feature-drafts.png';

export interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  descriptionOutside?: boolean;
  icon: string;
}

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'direct',
    title: 'Прямой переход',
    subtitle: 'Сразу открою нужный экран',
    description:
      'Сразу открываю нужный раздел без долгого поиска по меню. Например: выписки, тарифы, документы или настройки.',
    icon: iconFeatureDirect,
  },
  {
    id: 'faq',
    title: 'Умный FAQ',
    subtitle: 'Отвечу по базе знаний банка',
    description:
      'Быстро отвечаю на вопросы по сервису. Например: как добавить сотрудника, где найти реквизиты или как подключить услугу.',
    icon: iconFeatureFaq,
  },
  {
    id: 'explain',
    title: 'Объяснить простыми словами',
    subtitle: 'Переведу банковский язык',
    description:
      'Объясню сложные банковские термины и статусы простым языком. Например: почему платеж отклонен, что значит инкассовое поручение или условия тарифа.',
    icon: iconFeatureExplain,
  },
  {
    id: 'drafts',
    title: 'Умные черновики',
    subtitle: 'Верну к незавершенной операции',
    description:
      'Напоминаю о действиях, которые вы начали, но не завершили. Например: платёж, справка, выписка или настройка фильтра.',
    descriptionOutside: true,
    icon: iconFeatureDrafts,
  },
];

export const QUICK_ACTIONS = [
  { id: 'rates', label: 'Курсы валют', query: 'Курсы валют' },
  { id: 'statement', label: 'Выписка', query: 'Где скачать выписку?' },
  { id: 'drafts', label: 'Черновики', query: 'Покажи мои черновики' },
] as const;
