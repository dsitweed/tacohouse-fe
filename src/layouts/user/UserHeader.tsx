import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { App, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ChangeLanguage from '@/components/common/ChangeLanguage';
import { authActions, selectUser } from '@/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useApiClient } from '@/shared/hooks/api';
import { UserRole } from '@/shared/constants';

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
      console.log(error);
    }
  };

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
        <div className="hidden pl-8 lg:flex items-center gap-6 font-semibold">
          <Link to="#" className=" text-lg">
            Rooms
          </Link>
          <Link to="#" className=" text-lg">
            Chat
          </Link>
          {currentUser?.role === UserRole.MANAGER && (
            <Link to="/managers" className=" text-lg">
              Manager Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <ChangeLanguage />
        {currentUser ? (
          <Button
            className="border border-primary font-bold"
            onClick={() => handleSignOut()}
          >
            {t('auth.signOut')}
          </Button>
        ) : (
          <>
            <Button
              className="border border-primary font-bold"
              onClick={() => navigate('/auth/sign-in')}
            >
              {t('auth.signIn')}
            </Button>
            <Button
              className="border border-primary font-bold"
              onClick={() => navigate('/auth/sign-up')}
            >
              {t('auth.signUp')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
