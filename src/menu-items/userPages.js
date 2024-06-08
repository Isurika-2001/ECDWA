// assets
import {
  IconKey,
  IconAffiliate,
  IconUsers,
  IconCertificate,
  IconArticle,
  IconCategory,
  IconReport,
  IconMessage,
  IconCreditCard
} from '@tabler/icons-react';

// import subscription icon

// constant
const icons = {
  IconKey,
  IconAffiliate,
  IconUsers,
  IconCertificate,
  IconArticle,
  IconCategory,
  IconReport,
  IconMessage,
  IconCreditCard
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Tools',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'subscription-plans',
      title: 'subscription-plans',
      type: 'collapse',
      icon: icons.IconCreditCard,

      children: [
        {
          id: 'subscription-plans',
          title: 'subscription-plans',
          type: 'item',
          external: true,
          url: '/app/subscription',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
