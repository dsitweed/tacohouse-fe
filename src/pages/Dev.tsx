import { useTranslation } from 'react-i18next';

const lngs: Record<string, { nativeName: string }> = {
  en: { nativeName: 'English' },
  vi: { nativeName: 'Viet Nam' },
};

export default function Dev() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <h1>{t('auth.signIn')}</h1>
    </div>
  );
}
