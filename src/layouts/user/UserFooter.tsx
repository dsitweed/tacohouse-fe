import { Link } from 'react-router-dom';
import Github_logo from '@/assets/images/Github_logo.png';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

export default function UserFooter() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Typography.Text>
            Copyright © {new Date().getFullYear()} by Nguyen Van Ky
          </Typography.Text>
          <a href="#" target="_blank">
            <img src={Github_logo} alt="github logo" className="h-6 w-6" />
          </a>
        </div>
        <div className="hidden gap-8 lg:flex">
          <Link to={'#'}>{t('auth.footer.company')}</Link>
          <Link to={'#'}>{t('auth.footer.aboutUs')}</Link>
          <Link to={'#'}>{t('auth.footer.teams')}</Link>
          <Link to={'#'}>{t('auth.footer.products')}</Link>
          <Link to={'#'}>{t('auth.footer.blogs')}</Link>
          <Link to={'#'}>{t('auth.footer.pricing')}</Link>
        </div>
      </div>
    </div>
  );
}
