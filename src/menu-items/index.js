import dashboard from './dashboard';
import pages from './pages';
import userPages from './userPages';
import userDashboard from './userDashboard';
import { useAuthContext } from 'context/useAuthContext';
import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const MenuItems = () => {
  const { user } = useAuthContext();
  const role = user?.role;

  let userSpecificPages;

  if (role === 'admin') {
    userSpecificPages = [dashboard, pages, other];
  } else if (role === 'user') {
    userSpecificPages = [userDashboard, userPages];
  }

  const menuItems = {
    items: userSpecificPages
  };

  return menuItems;
};

export default MenuItems;
