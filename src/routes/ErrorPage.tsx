import { useNavigate, useRouteError } from 'react-router-dom';
import notFoundBg from '@/assets/images/404_error.gif';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-screen w-screen bg-white items-center justify-center">
      <div
        className="bg-center flex justify-center w-full relative"
        style={{
          backgroundImage: `url(${notFoundBg})`,
          backgroundRepeat: 'no-repeat',
          height: 450,
        }}
      >
        <h1 className="text-9xl">{error.status}</h1>
        <div className="text-2xl absolute bottom-6">
          {t('routes.errorsPage.report')}
        </div>
      </div>
      <p className="text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
      <Button
        size="large"
        type="primary"
        className="bg-primary my-3"
        onClick={() => navigate('/')}
      >
        {t('routes.errorsPage.backToHome')}
      </Button>
    </div>
  );
}
