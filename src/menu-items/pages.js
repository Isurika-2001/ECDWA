// assets
import { IconMicrophone, IconMusic, IconTags, IconUserPlus } from '@tabler/icons-react';

// constant
const icons = {
  IconMicrophone,
  IconMusic,
  IconTags,
  IconUserPlus
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Tools',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'artist',
      title: 'Artist',
      type: 'collapse',
      icon: icons.IconMicrophone,

      children: [
        {
          id: 'artist',
          title: 'Artist',
          type: 'item',
          external: true,
          url: '/app/artist',
          breadcrumbs: false
        },
        {
          id: 'add-new-artist',
          title: 'Add New Artist',
          type: 'item',
          url: '/app/artist/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'album',
      title: 'Album',
      type: 'collapse',
      icon: icons.IconMusic,

      children: [
        {
          id: 'album',
          title: 'Album',
          type: 'item',
          external: true,
          url: '/app/album',
          breadcrumbs: false
        },
        {
          id: 'add-new-album',
          title: 'Add New Album',
          type: 'item',
          url: '/app/album/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'genre',
      title: 'Genre',
      type: 'collapse',
      icon: icons.IconTags,

      children: [
        {
          id: 'genre',
          title: 'Genre',
          type: 'item',
          external: true,
          url: '/app/genre',
          breadcrumbs: false
        },
        {
          id: 'add-new-genre',
          title: 'Add New Genre',
          type: 'item',
          url: '/app/genre/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'user',
      title: 'User',
      type: 'collapse',
      icon: icons.IconUserPlus,

      children: [
        {
          id: 'user',
          title: 'User',
          type: 'item',
          external: true,
          url: '/app/user',
          breadcrumbs: false
        },
        {
          id: 'add-new-user',
          title: 'Add New User',
          type: 'item',
          url: '/app/user/add',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default pages;
