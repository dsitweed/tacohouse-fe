import logo from '@/assets/logo.png';
import ChangeLanguage from '@/components/common/ChangeLanguage';
import { UserRole } from '@/shared/constants';
import { useApiClient } from '@/shared/hooks/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { authActions, selectUser } from '@/store/slices/auth.slice';
import { App, Avatar, Button, Dropdown, MenuProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

export default function UserHeader() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectUser);
  const apiSignOut = useApiClient('/auth/sign-out');
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      const response = await apiSignOut.create();

      if (response?.status === 200) {
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
        <Link to={'/me'} className="flex items-center gap-2">
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
    <div className="flex justify-between">
      <div className="flex">
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={logo} className="w-12 h-12" alt="web logo" />
          <Typography.Title level={2} className="font-bold text-2xl mt-2">
            {t('webName')}
          </Typography.Title>
        </div>
        <div className="hidden pl-8 md:flex items-center gap-6 font-semibold">
          <Link to="#" className=" text-lg">
            Rooms
          </Link>
          <Link to="#" className=" text-lg">
            Chat
          </Link>
          {currentUser?.role === UserRole.MANAGER && (
            <Link to="/managers" className="text-lg">
              Manager Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <ChangeLanguage />
        {currentUser ? (
          <Dropdown
            className="flex"
            trigger={['click']}
            menu={{
              items: menuDropdownItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar src={currentUser.avatarUrl} />
            </a>
          </Dropdown>
        ) : (
          <>
            <Button
              type="primary"
              className="font-bold"
              onClick={() => navigate('/sign-in')}
            >
              {t('auth.signIn')}
            </Button>
            <Button
              className="border border-primary font-bold"
              onClick={() => navigate('/sign-up')}
            >
              {t('auth.signUp')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
