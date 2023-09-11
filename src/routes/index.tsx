import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import UserLayout from '@/layouts/user';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import ManagerLayout from '@/layouts/manager';
import ManagerDashboard from '@/pages/manager/dashboard';
import ManagerBuilding from '@/pages/manager/building';
import Room from '@/pages/manager/room';
import UserDashboard from '@/pages/user/dashboard';
// import Dev from '../pages/Dev';

const isUserLoggedIn = true;

const router = createBrowserRouter([
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
      {
        path: 'auth/sign-in',
        element: <SignIn />,
      },
      {
        path: 'auth/sign-up',
        element: <SignUp />,
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
        path: 'rooms/:roomId',
        element: <Room />,
      },
    ],
  },
]);

export default router;
