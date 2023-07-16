import ChangeLanguage from "@/components/common/ChangeLanguage";
import { BellFilled, SearchOutlined, SettingFilled } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Typography,
} from "antd";
import { Link } from "react-router-dom";

const breadcrumbItems = [
  {
    title: <Link to="/">Home</Link>,
  },
];

const dropdownItems: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

export default function Header() {
  return (
    <Layout.Header className="bg-white flex justify-between px-4 items-center">
      <div className="flex flex-col">
        <Breadcrumb className="hidden md:block" items={breadcrumbItems} />
        <Typography className="uppercase text-lg font-bold">Dashboard</Typography>
      </div>
      <div className="flex items-center gap-3">
        <Input
          className="h w-80"
          prefix={<SearchOutlined />}
          placeholder="Search..."
        />
        {/* Change language button */}
        <ChangeLanguage />
        <SettingFilled style={{ color: "black" }} />
        <Badge size="small" count={4}>
          <Dropdown menu={{ items: dropdownItems }}>
            <a onClick={(e) => e.preventDefault()}>
              <BellFilled />
            </a>
          </Dropdown>
        </Badge>
        <Avatar
          className="ml-4"
          size="large"
          src={<img src={"src/assets/images/avatar.jpg"} alt="avatar" />}
        />
      </div>
    </Layout.Header>
  );
}
