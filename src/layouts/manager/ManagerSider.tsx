import { Avatar, Badge, Menu, Typography } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaHome } from 'react-icons/fa';
import { BsDoorClosedFill } from 'react-icons/bs';
import { BsFilePersonFill } from 'react-icons/bs';
// images
import logo from '@/assets/logo.png';
import avatar from '@/assets/images/avatar.jpg';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth.slice';

const { Title, Text } = Typography;

export default function ManagerSider() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectUser);

  const items = [
    {
      key: '/managers',
      label: t('routes.managers'),
      icon: <FaHome size={18} />,
      children: null,
    },
    {
      key: '/managers/buildings',
      label: t('routes.buildings'),
      icon: <FaBuilding size={18} />,
      children: null,
    },
    {
      key: '/managers/rooms',
      label: t('routes.rooms'),
      icon: <BsDoorClosedFill size={18} />,
      children: null,
    },
    {
      key: '/managers/tenants',
      label: t('routes.tenants'),
      icon: <BsFilePersonFill size={18} />,
      children: null,
    },
  ];

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
      <div
        className="flex items-center justify-center h-14 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={logo} className="w-12 h-12" alt="web logo" />
        <Title level={4} className="font-bold text-xl pt-6">
          {t('webName')}
        </Title>
      </div>
      {/* LIST NAVIGATION*/}
      <div>
        <Menu
          theme="light"
          mode="inline"
          className="px-2 pt-1 text-base font-semibold"
          defaultSelectedKeys={[location.pathname]}
          items={siderItems()}
        />
      </div>
      {/* FOOTER OF SIDER */}
      <div className="absolute bottom-4 flex items-center justify-center w-full gap-2">
        <Badge status="success" dot={true}>
          <Avatar
            shape="square"
            src={currentUser?.avatarUrl || avatar}
            size={'large'}
          />
        </Badge>
        <div>
          <Text>{currentUser?.email}</Text>
          <br />
          <Text className="font-bold">{currentUser?.role}</Text>
        </div>
      </div>
    </div>
  );
}
