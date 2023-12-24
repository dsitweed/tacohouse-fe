import { Link, createBrowserRouter } from 'react-router-dom';
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
import CreateTenant from '@/pages/manager/tenant/CreateTenant';
import Tenant from '@/pages/manager/tenant';
import EditRoom from '@/pages/manager/room/EditRoom';
import EditTenant from '@/pages/manager/tenant/EditTenant';
import i18n from '@/locales/i18n';

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
      {
        path: 'rooms/:roomId',
        element: <SingleRoom />,
      },
    ],
  },
  {
    // Routes for logged in Manager
    path: 'managers',
    element: <ManagerLayout />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => <Link to={'/managers'}>{i18n.t('routes.managers')}</Link>,
    },
    children: [
      {
        index: true,
        element: <ManagerDashboard />,
      },
      {
        path: 'buildings',
        handle: {
          crumb: () => (
            <Link to={'buildings'}>{i18n.t('routes.buildings')}</Link>
          ),
        },
        children: [
          {
            index: true,
            element: <ManagerBuilding />,
          },
          {
            path: ':buildingId',
            element: <SingleBuilding />,
          },
          {
            path: 'new',
            element: <CreateBuilding />,
            handle: {
              crumb: () => (
                <Link to={'buildings/new'}>{i18n.t('common.new')}</Link>
              ),
            },
          },
          {
            path: ':buildingId/edit',
            element: <EditBuilding />,
          },
        ],
      },
      {
        path: 'rooms',
        handle: {
          crumb: () => <Link to={'rooms'}>{i18n.t('routes.rooms')}</Link>,
        },
        children: [
          {
            index: true,
            element: <ManagerRoom />,
          },
          {
            path: ':roomId',
            element: <SingleRoom />,
          },
          {
            path: 'new',
            element: <CreateRoom />,
          },
          {
            path: ':roomId/edit',
            element: <EditRoom />,
          },
        ],
      },
      {
        path: 'tenants',
        handle: {
          crumb: () => <Link to={'tenants'}>{i18n.t('routes.tenants')}</Link>,
        },
        children: [
          {
            index: true,
            element: <Tenant />,
          },
          {
            path: 'new',
            element: <CreateTenant />,
          },
          {
            path: ':tenantId',
            element: <EditTenant />,
          },
          {
            path: ':tenantId/edit',
            element: <EditTenant />,
          },
        ],
      },
      {
        path: 'dev',
        element: <Dev />,
      },
    ],
  },
]);

export default router;
