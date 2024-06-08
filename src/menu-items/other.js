// assets
import { IconAlbum, IconMusic, IconStar, IconTrendingUp } from '@tabler/icons-react';

// constant
const icons = { IconAlbum, IconMusic, IconStar, IconTrendingUp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  title: 'Reports',
  caption: '',
  children: [
    {
      id: 'inventory-reports',
      title: 'Inventory Reports',
      type: 'item',
      url: '/app/inventory-reports',
      icon: icons.IconTrendingUp,
      breadcrumbs: false
    }
  ]
};

export default other;
