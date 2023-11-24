import { Avatar, Badge, Menu, Typography } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaHome } from 'react-icons/fa';
import { BsDoorClosedFill } from 'react-icons/bs';
// images
import logo from '@/assets/logo.png';
import avatar from '@/assets/images/avatar.jpg';

const { Title, Text } = Typography;

const items = [
  {
    key: '/managers',
    label: 'Dashboard',
    icon: <FaHome size={18} />,
    children: null,
  },
  {
    key: '/managers/buildings',
    label: 'Buildings',
    icon: <FaBuilding size={18} />,
    children: null,
  },
  {
    key: '/managers/rooms',
    label: 'Rooms',
    icon: <BsDoorClosedFill size={18} />,
    children: null,
  },
];

export default function ManagerSider() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const siderItems = useCallback(
    () =>
      items.map((item) => ({
        ...item,
        label: item.label,
        onClick: () => navigate(item.key),
      })),
    [navigate],
  );
  return (
    <div>
      <div className="flex items-center">
        <img src={logo} className="w-12 h-12" alt="web logo" />
        <Title level={4} className="font-bold text-xl mt-2">
          {t('webName')}
        </Title>
      </div>
      {/* LIST NAVIGATION*/}
      <div>
        <Menu
          theme="light"
          mode="inline"
          className="px-2 pt-2 text-base font-semibold"
          defaultSelectedKeys={[location.pathname]}
          items={siderItems()}
        />
      </div>
      {/* FOOTER OF SIDER */}
      <div className="absolute bottom-4 flex items-center justify-center w-full gap-2">
        <Badge status="success" dot={true}>
          <Avatar shape="square" src={avatar} size={'large'} />
        </Badge>
        <Text>Nguyễn Văn Kỳ</Text>
      </div>
    </div>
  );
}
