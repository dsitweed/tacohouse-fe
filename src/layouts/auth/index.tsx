import { Layout } from 'antd';
import { Outlet } from 'react-router';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

export default function AuthLayout() {
  return (
    <Layout className="h-screen">
      <Layout.Header style={{ backgroundColor: '#fafafa' }}>
        <AuthHeader />
      </Layout.Header>
      <Layout.Content className="h-full overflow-auto">
        <Outlet />
      </Layout.Content>
      <Layout.Footer className="h-12 py-3">
        <AuthFooter />
      </Layout.Footer>
    </Layout>
  );
}
