import { Layout } from 'antd';
import { Outlet } from 'react-router';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';

export default function UserLayout() {
  return (
    <Layout>
      <Layout.Header className="pt-2" style={{ backgroundColor: '#fafafa' }}>
        <UserHeader />
      </Layout.Header>
      <Layout.Content className="h-full px-10 py-4">
        <Outlet />
      </Layout.Content>
      <Layout.Footer className="h-12 py-3">
        <UserFooter />
      </Layout.Footer>
    </Layout>
  );
}
