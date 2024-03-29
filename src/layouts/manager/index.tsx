import { useEffect } from 'react';
import { App, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import ManagerSider from './ManagerSider';
import ManagerHeader from './ManagerHeader';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth.slice';
import { UserRole } from '@/shared/constants';
import { useTranslation } from 'react-i18next';

export default function ManagerLayout() {
  const { t } = useTranslation();
  const currentUser = useAppSelector(selectUser);
  const { notification } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const hasPermission =
      currentUser?.role === UserRole.MANAGER ||
      currentUser?.role === UserRole.ADMIN;

    if (!hasPermission) {
      notification.error({
        message: t('auth.signInRequired'),
      });
      navigate('/sign-in');
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-row">
      <ManagerSider />
      <Layout>
        <Layout.Header className="bg-white">
          <ManagerHeader />
        </Layout.Header>
        <Layout.Content className="h-full overflow-auto px-6 py-4">
          <Outlet />
        </Layout.Content>
      </Layout>
    </div>
  );
}
