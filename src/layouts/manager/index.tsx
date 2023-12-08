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

  const hasPermission =
    currentUser?.role === UserRole.MANAGER ||
    currentUser?.role === UserRole.ADMIN;

  useEffect(() => {
    if (!hasPermission) {
      notification.error({
        message: t('auth.signInRequired'),
      });
      navigate('/auth/sign-in');
    }
  }, [currentUser, navigate]);

  return (
    <Layout className="h-screen">
      <Layout.Sider theme="light" trigger={null} className="hidden lg:block">
        <ManagerSider />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="bg-white">
          <ManagerHeader />
        </Layout.Header>
        <Layout.Content className="h-full overflow-auto px-6 py-4">
          {hasPermission && <Outlet />}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
