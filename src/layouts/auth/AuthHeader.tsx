import { useTranslation } from 'react-i18next';

export default function AuthHeader() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center h-full w-full">
      <h2 className="text-2xl font-semibold">{t('webName')}</h2>
    </div>
  );
}
