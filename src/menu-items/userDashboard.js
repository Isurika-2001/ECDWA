// assets
import { IconDashboard, IconAlbum } from '@tabler/icons-react';

// constant
const icons = { IconDashboard, IconAlbum };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'view-albums',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'View Albums',
      type: 'item',
      url: '/',
      icon: icons.IconAlbum,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
