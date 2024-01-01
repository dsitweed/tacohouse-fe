import { Avatar, Badge, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { BsDoorClosedFill, BsFilePersonFill } from 'react-icons/bs';
import { FaBuilding, FaHome, FaFileInvoiceDollar } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
// images
import avatar from '@/assets/images/avatar.jpg';
import logo from '@/assets/logo.png';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth.slice';

const { Title, Text } = Typography;

export default function ManagerSider() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectUser);

  const siderItems = [
    {
      key: '/managers',
      label: t('routes.managers'),
      icon: <FaHome size={21} />,
      children: null,
    },
    {
      key: '/managers/buildings',
      label: t('routes.buildings'),
      icon: <FaBuilding size={21} />,
      children: null,
    },
    {
      key: '/managers/rooms',
      label: t('routes.rooms'),
      icon: <BsDoorClosedFill size={21} />,
      children: null,
    },
    {
      key: '/managers/tenants',
      label: t('routes.tenants'),
      icon: <BsFilePersonFill size={21} />,
      children: null,
    },
    {
      key: '/managers/invoices',
      label: t('routes.invoices'),
      icon: <FaFileInvoiceDollar size={21} />,
      children: null,
    },
  ];

  console.log({
    location: location.pathname,
  });

  return (
    <div className="group transition-all duration-500 w-[76px] hover:w-[250px] relative">
      <div
        className="flex items-center pl-2 h-14 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={logo} className="w-12 h-12" alt="web logo" />
        <Title
          level={3}
          className="group-hover:block hidden whitespace-nowrap font-bold text-xl pt-6"
        >
          {t('webName')}
        </Title>
      </div>
      {/* LIST NAVIGATION*/}
      <div className="px-4 mt-2">
        {siderItems.map((item) => (
          <div
            key={item.key}
            className={
              item.key === location.pathname
                ? 'flex gap-2 items-center p-2 rounded-lg cursor-pointer font-bold bg-blue-300'
                : 'flex gap-2 items-center p-2 rounded-lg cursor-pointer'
            }
            onClick={() => navigate(item.key)}
          >
            <div className="py-1">{item.icon}</div>
            <p className="group-hover:block hidden whitespace-nowrap text-lg">
              {item.label}
            </p>
          </div>
        ))}
      </div>
      {/* FOOTER OF SIDER */}
      <div className="group-hover:flex hidden whitespace-nowrap absolute bottom-4 items-center w-full pl-4 gap-2">
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
