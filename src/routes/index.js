// import { useAuthContext } from '../context/useAuthContext';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Loadable from '../ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// artist routing
const ViewArtists = Loadable(lazy(() => import('views/pages/artist/viewArtists')));
const ArtistForm = Loadable(lazy(() => import('views/pages/artist/artistForm')));
const UpdateArtist = Loadable(lazy(() => import('views/pages/artist/artistForm-update')));

// album routing
const ViewAlbums = Loadable(lazy(() => import('views/pages/album/viewAlbums')));
const AlbumForm = Loadable(lazy(() => import('views/pages/album/albumForm')));
const UpdateAlbum = Loadable(lazy(() => import('views/pages/album/albumForm-update')));
const AlbumDetails = Loadable(lazy(() => import('views/pages/album/albumDetails')));

// genre routing
const ViewGenres = Loadable(lazy(() => import('views/pages/genre/viewGenres')));
const GenreForm = Loadable(lazy(() => import('views/pages/genre/genreForm')));
const UpdateGenre = Loadable(lazy(() => import('views/pages/genre/genreForm-update')));

// user routing
const ViewUsers = Loadable(lazy(() => import('views/pages/user/viewUsers')));
const UserForm = Loadable(lazy(() => import('views/pages/user/userForm')));
const UpdateUser = Loadable(lazy(() => import('views/pages/user/userForm-update')));

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const InventoryReport = Loadable(lazy(() => import('views/reports/inventory-reports')));
const SubscriptionPlans = Loadable(lazy(() => import('views/subscriptions/subscription')));

// // utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// // sample page routing
// const AllAlbums = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

export default function ThemeRoutes() {
  // const { user } = useAuthContext();
  // const { permissions } = user || {};

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/dashboard" />} />
      <Route path="pages" element={<Outlet />}>
        <Route path="login" element={<AuthLogin3 />} />
        <Route path="register" element={<AuthRegister3 />} />
      </Route>

      {/* <Route path="*" element={<PageNotFound />} /> */}

      <Route path="app" element={<MainLayout />}>
        {/* <Route path="access-denied" element={<AccessDeniedPage />} /> */}
        <Route path="dashboard" element={<DashboardDefault />} />
        {/* <Route path="profile" element={<UserForm />} /> */}

        {/* Artist section */}
        <Route path="artist" element={<Outlet />}>
          <Route index element={<ViewArtists />} />
          <Route path="add" element={<ArtistForm />} />
          <Route path="update" element={<UpdateArtist />} />
        </Route>

        {/* Album section */}
        <Route path="album" element={<Outlet />}>
          <Route index element={<ViewAlbums />} />
          <Route path="add" element={<AlbumForm />} />
          <Route path="update" element={<UpdateAlbum />} />
          <Route path="details" element={<AlbumDetails />} />
        </Route>

        {/* Genre section */}
        <Route path="genre" element={<Outlet />}>
          <Route index element={<ViewGenres />} />
          <Route path="add" element={<GenreForm />} />
          <Route path="update" element={<UpdateGenre />} />
        </Route>

        {/* User section */}
        <Route path="user" element={<Outlet />}>
          <Route index element={<ViewUsers />} />
          <Route path="add" element={<UserForm />} />
          <Route path="update" element={<UpdateUser />} />
        </Route>

        {/* Report page */}
        <Route path="inventory-reports" element={<InventoryReport />} />

        {/* Subscription page */}
        <Route path="subscription" element={<SubscriptionPlans />} />
      </Route>
    </Routes>
  );
}
