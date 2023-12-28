import { BellFilled, SearchOutlined, SettingFilled } from '@ant-design/icons';
import {
  App,
  Avatar,
  Badge,
  Dropdown,
  Input,
  MenuProps,
  Typography,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

// images
import avatar from '@/assets/images/avatar.jpg';
import { useApiClient } from '@/shared/hooks/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { authActions, selectUser } from '@/store/slices/auth.slice';
import { useTranslation } from 'react-i18next';
import AppBreadcrumb from '@/components/common/AppBreadcrum';

import { MdOutlineLogout } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

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
  const { notification } = App.useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const apiSignOut = useApiClient('/auth/sign-out');

  const handleSignOut = async () => {
    try {
      const response = await apiSignOut.create();

      if (response?.success) {
        dispatch(authActions.signOut());

        notification.success({
          message: t('auth.signOutSuccess'),
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const menuDropdownItems: MenuProps['items'] = [
    {
      label: (
        <Link to={'/managers/me'} className="flex items-center gap-2">
          <FaUserCircle />
          {t('me.profile')}
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <Typography.Text
          onClick={() => handleSignOut()}
          className="flex items-center gap-2"
        >
          <MdOutlineLogout />
          {t('auth.signOut')}
        </Typography.Text>
      ),
      key: '0',
    },
  ];

  return (
    <div className="bg-white flex justify-between items-center h-full">
      <div className="flex flex-col">
        {/* <Breadcrumb className="hidden md:block" items={breadcrumbItems} /> */}
        <div className="pt-1 hidden md:block">
          <AppBreadcrumb />
        </div>
        <p className="uppercase text-lg font-bold">Dashboard</p>
      </div>
      <div className="flex items-center gap-3">
        <Input
          className="h w-80 hidden lg:flex"
          prefix={<SearchOutlined className="mr-1" />}
          placeholder={`${t('common.search')}`}
        />
        {/* Change language button */}
        <SettingFilled style={{ color: 'black' }} />
        <Badge size="small" count={dropdownItems?.length}>
          <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <BellFilled />
            </a>
          </Dropdown>
        </Badge>
        <Dropdown
          menu={{ items: menuDropdownItems }}
          trigger={['click']}
          className="flex"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Avatar
              className="ml-4"
              size="large"
              src={<img src={currentUser?.avatarUrl || avatar} alt="avatar" />}
            />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
