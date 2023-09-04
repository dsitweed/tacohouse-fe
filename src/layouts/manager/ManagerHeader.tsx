import { BellFilled, SearchOutlined, SettingFilled } from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Dropdown,
  Input,
  MenuProps,
  Typography,
} from 'antd';
import { Link } from 'react-router-dom';

// images
import avatar from '@/assets/images/avatar.jpg';

const breadcrumbItems = [
  {
    title: <Link to="/">Home</Link>,
  },
];

const dropdownItems: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

export default function ManagerHeader() {
  return (
    <div className="bg-white flex justify-between mt-2 items-center">
      <div className="flex flex-col">
        <Breadcrumb className="hidden md:block" items={breadcrumbItems} />
        <Typography className="uppercase text-lg font-bold">
          Dashboard
        </Typography>
      </div>
      <div className="flex items-center gap-3">
        <Input
          className="h w-80 hidden lg:flex"
          prefix={<SearchOutlined />}
          placeholder="Search..."
        />
        {/* Change language button */}
        <SettingFilled style={{ color: 'black' }} />
        <Badge size="small" count={dropdownItems?.length}>
          <Dropdown menu={{ items: dropdownItems }}>
            <a onClick={(e) => e.preventDefault()}>
              <BellFilled />
            </a>
          </Dropdown>
        </Badge>
        <Avatar
          className="ml-4"
          size="large"
          src={<img src={avatar} alt="avatar" />}
        />
      </div>
    </div>
  );
}
