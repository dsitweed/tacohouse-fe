import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ChangeLanguage from '@/components/common/ChangeLanguage';

export default function UserHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        </div>
      </div>

      <div className="flex items-center justify-end gap-6">
        <ChangeLanguage />
        <Button className="border border-primary">
          <Link to={'/auth/sign-in'} className="font-bold">
            {t('auth.signIn')}
          </Link>
        </Button>
      </div>
    </div>
  );
}
