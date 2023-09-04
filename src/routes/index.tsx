import { createBrowserRouter } from 'react-router-dom';
import Dev from '../pages/Dev';
import ErrorPage from './ErrorPage';
import AuthLayout from '@/layouts/auth';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import ManagerLayout from '@/layouts/manager';
import ManagerDashboard from '@/pages/manager/dashboard';
import ManagerBuilding from '@/pages/manager/building';
import Room from '@/pages/manager/room';

const isUserLoggedIn = true;

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        // Public routes
        index: true,
        element: <Dev />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            path: 'sign-in',
            element: <SignIn />,
          },
          {
            path: 'sign-up',
            element: <SignUp />,
          },
        ],
      },
      isUserLoggedIn && {
        // Routes for logged in User
        path: 'users',
      },
      {
        // Routes for logged in Manager
        path: 'managers',
        element: <ManagerLayout />,
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
      isUserLoggedIn && {
        // Routes for logged in Admin
        path: 'admin',
      },
    ],
  },
]);

export default router;
