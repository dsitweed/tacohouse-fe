import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import ManagerSider from './ManagerSider';
import ManagerHeader from './ManagerHeader';

export default function ManagerLayout() {
  return (
    <Layout className="h-screen">
      <Layout.Sider theme="light" trigger={null}>
        <ManagerSider />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="bg-white">
          <ManagerHeader />
        </Layout.Header>
        <Layout.Content className="h-full overflow-auto px-6 py-4">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
