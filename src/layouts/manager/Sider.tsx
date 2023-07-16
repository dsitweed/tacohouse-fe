import { Button, Layout, Menu } from "antd";
import { useCallback, useState } from "react";
// logo
import logo from "@/assets/images/logo.jpg";

import {
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "/",
    label: "Dashboard",
    icon: null,
    children: null,
  },
  {
    key: "/tenant",
    label: "Manage Tenants",
    icon: null,
    children: null,
  },
  {
    key: "/room",
    label: "Manage Rooms",
    icon: null,
    children: null,
  },
  {
    key: "/invoice",
    label: "Manage Invoices",
    icon: null,
    children: null,
  },
];

export default function Sider() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const siderItems = useCallback(
    () =>
      items.map((item) => ({
        ...item,
        label: item.label,
        onClick: () => navigate(item.key)
      })),
    [navigate]
  );

  return (
    <Layout.Sider
      trigger={null}
      theme="light"
      collapsed={collapsed}
      collapsible={true}
    >
      {/* Header */}
      <div
        className={
          collapsed
            ? "flex items-center gap-3 m-4 justify-center h-12"
            : `flex items-center gap-3 m-4 justify-between`
        }
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img className="w-12 h-12" src={logo} alt="logo" />
            <h2 className="font-bold text-xl">Tacohouse</h2>
          </div>
        )}
        {/* <MenuOutlined
          style={{ fontSize: 20 }}
          onClick={() => setCollapsed(!collapsed)}
        /> */}
      </div>
      <div className="">
        <Menu
          theme="light"
          mode="inline"
          className="px-2 pt-2"
          defaultSelectedKeys={[location.pathname]}
          items={siderItems()}
          style={{
            fontSize: 16,
            fontWeight: 700,
          }}
        />
        <div className="absolute bottom-4 flex justify-center w-full">
          <Button icon={<LogoutOutlined />}>Logout</Button>
        </div>
      </div>
    </Layout.Sider>
  );
}
