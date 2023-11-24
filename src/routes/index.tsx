import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import UserLayout from '@/layouts/user';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import ManagerLayout from '@/layouts/manager';
import ManagerDashboard from '@/pages/manager/dashboard';
import ManagerBuilding from '@/pages/manager/building';
import ManagerRoom from '@/pages/manager/room';
import UserDashboard from '@/pages/user/dashboard';
import AuthLayout from '@/layouts/user/AuthLayout';
import Dev from '../pages/Dev';
import CreateBuilding from '@/pages/manager/building/CreateBuilding';
import CreateRoom from '@/pages/manager/room/CreateRoom';
import SingleRoom from '@/pages/manager/room/SingleRoom';
import SingleBuilding from '@/pages/manager/building/SingleBuilding';
import EditBuilding from '@/pages/manager/building/EditBuilding';

const isUserLoggedIn = true;

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // To prevent user accesses the /auth path
        index: true,
        element: <SignIn />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // Public routes
        index: true,
        element: <UserDashboard />,
      },
      isUserLoggedIn && {
        // Routes for logged in User
        path: 'users',
      },
    ],
  },
  {
    // Routes for logged in Manager
    path: 'managers',
    element: <ManagerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ManagerDashboard />,
      },
      {
        path: 'buildings',
        element: <ManagerBuilding />,
      },
      {
        path: 'buildings/:buildingId',
        element: <SingleBuilding />,
      },
      {
        path: 'buildings/new',
        element: <CreateBuilding />,
      },
      {
        path: 'buildings/:buildingId/edit',
        element: <EditBuilding />,
      },
      {
        path: 'rooms',
        element: <ManagerRoom />,
      },
      {
        path: 'rooms/:roomId',
        element: <SingleRoom />,
      },
      {
        path: 'rooms/new',
        element: <CreateRoom />,
      },
      {
        path: 'dev',
        element: <Dev />,
      },
    ],
  },
]);

export default router;
