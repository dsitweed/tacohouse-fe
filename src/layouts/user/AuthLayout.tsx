import { Layout } from 'antd';
import { Outlet } from 'react-router';
import UserHeader from './UserHeader';
import UserFooter from './UserFooter';
export default function AuthLayout() {
  return (
    <Layout className="h-screen">
      <Layout.Header className="pt-2" style={{ backgroundColor: '#fafafa' }}>
        <UserHeader />
      </Layout.Header>
      <Layout.Content className="h-full bg-white py-4">
        <Outlet />
      </Layout.Content>
      <Layout.Footer className="h-12 py-4 hidden md:block">
        <UserFooter />
      </Layout.Footer>
    </Layout>
  );
}
